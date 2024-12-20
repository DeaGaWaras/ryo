// Decoded version for better readability
const globalDb = global.db;

function getDecodedValue(index, offset) {
    const decodedArray = getEncodedArray();
    return decodedArray[index - 0x145];
}

function getEncodedArray() {
    return [
        'chats', 'key', '207434xykfaU', 'toLowerCase', 'store',
        '3815520YNSEdP', '4604756MFRwKQ', 'includes', 'title',
        '6547480zYdADi', 'chat', '34993CEFCId', 'sendMedia', '1592gZQbdB',
        '1065549ODdKIv', 'find', 'data', 'isImage', 'response', 'exports',
        '25607619DHzOMB', '12VzVOOQ', 'listResponseMessage'
    ];
}

module.exports = {
    async all(data) {
        const chatKey = data.key;
        let chatData = globalDb.store.chats[chatKey];

        if (!chatData) {
            chatData = { key: [] };
            globalDb.store.chats[chatKey] = chatData;
        }

        const responses = chatData.key;
        if (!responses.length) return;

        const inputText = (data.text || data.message?.title)?.toLowerCase();
        const matchedResponse = responses.find(response =>
            response.key.toLowerCase().includes(inputText)
        );

        if (matchedResponse) {
            const isImageResponse = matchedResponse.isImage && matchedResponse.imageUrl;

            if (isImageResponse) {
                await this.sendMedia(data.chat, isImageResponse, data, {
                    caption: matchedResponse.title
                });
            } else {
                await this.reply(data.chat, matchedResponse.title, data);
            }
        }
    }
};
