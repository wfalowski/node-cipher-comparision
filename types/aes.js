const aesjs = require('aes-js');

const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// The initialization vector
const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

const encrypt = (text) => {
    const textBytes = aesjs.utils.utf8.toBytes(text);

    let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    let encryptedBytes = aesCbc.encrypt(textBytes);

    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log('Encrypted value: ', encryptedHex);
}

const decrypt = (encryptedHex) => {
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    // The cipher-block chaining mode of operation maintains internal
    // state, so to decrypt a new instance must be instantiated.
    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    const decryptedBytes = aesCbc.decrypt(encryptedBytes);

    // Convert our bytes back into text
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log('Decrypted value: ', decryptedText);
}

const testCrypt = (text) => {
    console.log('Initial value: ', text);
    // Convert text to bytes (text must be a multiple of 16 bytes)
    const textBytes = aesjs.utils.utf8.toBytes(text);

    let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    let encryptedBytes = aesCbc.encrypt(textBytes);

    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log('Encrypted value: ', encryptedHex);

    // When ready to decrypt the hex string, convert it back to bytes
    encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    // The cipher-block chaining mode of operation maintains internal
    // state, so to decrypt a new instance must be instantiated.
    aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    const decryptedBytes = aesCbc.decrypt(encryptedBytes);

    // Convert our bytes back into text
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log('Decrypted value: ', decryptedText);
}

module.exports = {
    encrypt,
    decrypt,
    testCrypt
};