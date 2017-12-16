const NodeRSA = require('node-rsa');
const chalk = require('chalk');
const fs = require('fs');

const privateKey = fs.readFileSync(__dirname + '/keys/rsa_private.pem');
const publicKey = fs.readFileSync(__dirname + '/keys/rsa_public.pem');
// const publicKey = fs.readFileSync(__dirname + '/keys/rsa_public_invalid.pem');
const key = new NodeRSA(privateKey);

key.importKey(publicKey, 'public');

const encrypt = (text) => {
    const encrypted = key.encrypt(text, 'base64');
    console.log('Encrypted value: ', encrypted);
}

const decrypt = (encrypted) => {
    const decrypted = key.decrypt(encrypted, 'utf8');
    console.log('Decrypted value: ', decrypted);
}

const testCrypt = (text) => {
    console.log('Initial value: ', text);
    const encrypted = key.encrypt(text, 'base64');
    console.log('Encrypted value: ', encrypted);

    const decrypted = key.decrypt(encrypted, 'utf8');
    console.log('Decrypted value: ', decrypted);
}

module.exports = {
    encrypt,
    decrypt,
    testCrypt
};