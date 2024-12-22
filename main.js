(async () => {
  const {
    useMultiFileAuthState,
    DisconnectReason,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    PHONENUMBER_MCC,
    fetchLatestBaileysVersion,
    proto,
  } = require("@adiwajshing/baileys");

  const pino = require("pino");
  const WebSocket = require("ws");
  const path = require("path");
  const fs = require("fs");
  const yargs = require("yargs/yargs");
  const childProcess = require("child_process");
  const lodash = require("lodash");
  const syntaxError = require("syntax-error");
  const os = require("os");
  const fetch = require("node-fetch");
  const chalk = require("chalk");
  const readline = require("readline");

  let simple = require("./lib/simple");
  let lowdb;

  try {
    lowdb = require("lowdb");
  } catch (error) {
    lowdb = require("./lib/lowdb");
  }

  const { Low, JSONFile } = lowdb;
  const MongoDB = require("./lib/mongoDB");

  const args = yargs(process.argv.slice(2)).exitProcess(false).parse();
  const promptUser = (query) =>
    new Promise((resolve) =>
      readline
        .createInterface({
          input: process.stdin,
          output: process.stdout,
        })
        .question(query, resolve)
    );

  global.API = (base, endpoint = "/", params = {}, apiKeyField) => {
    const apiBase = global.APIs?.[base] || base;
    const queryParams = new URLSearchParams({
      ...params,
      ...(apiKeyField ? { [apiKeyField]: global.APIKeys?.[apiBase] } : {}),
    });

    return `${apiBase}${endpoint}${queryParams ? `?${queryParams}` : ""}`;
  };

  global.opts = args;
  global.prefix = new RegExp(
    `^[${(args.prefix || "!#$%+|-=.@").replace(
      /[|\\{}()[\]^$+*?.\-]/g,
      "\\$&"
    )}]`
  );

  const dbFilePath =
    args.db ||
    "mongodb+srv://dhea:admin@cluster0.ojnf8.mongodb.net/?retryWrites=true&w=majority" ||
    "database.json";
  global.db = new Low(
    /https?:\/\//.test(dbFilePath)
      ? new cloudDBAdapter(dbFilePath)
      : /mongodb/.test(dbFilePath)
      ? new MongoDB(dbFilePath)
      : new JSONFile(dbFilePath)
  );

  global.loadDatabase = async () => {
    if (global.db.READ) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!global.db.READ) {
            clearInterval(interval);
            resolve(global.db.data || global.loadDatabase());
          }
        }, 1000);
      });
    }

    if (global.db.data) return;

    global.db.READ = true;
    await global.db.read();
    global.db.READ = false;
    global.db.data ||= {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
    };
    global.db.chain = lodash.chain(global.db.data);
  };

  await global.loadDatabase();

  const sessionPath = args._[0] || "sessions";
  const isInit = !fs.existsSync(sessionPath);
  const { state, saveState } = await useMultiFileAuthState(sessionPath);
  const { version, isLatest } = await fetchLatestBaileysVersion();

  console.log(
    chalk.magenta(`Using WA version: ${version.join(".")}, Latest: ${isLatest}`)
  );

  const connOptions = {
    printQRInTerminal: !args.code,
    syncFullHistory: true,
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({ level: "silent" }),
  };

  global.conn = simple.makeWASocket(connOptions);

  if (isInit) {
    console.log(chalk.green("Initializing new session"));
  }

  global.conn.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        console.log("Reconnecting...");
        global.conn = simple.makeWASocket(connOptions);
      } else {
        console.log("Connection closed, not reconnecting.");
      }
    }
    console.log("Connection update:", update);
  });

  global.conn.ev.on("creds.update", saveState);

  process.on("uncaughtException", console.error);
})();
