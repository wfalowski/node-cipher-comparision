var crypto = require("crypto");
const chalk = require('chalk');
const fs = require('fs');

const privateKey = fs.readFileSync(__dirname + '/keys/rsa_private.pem');
const publicKey = fs.readFileSync(__dirname + '/keys/rsa_public.pem');
// const publicKey = fs.readFileSync(__dirname + '/keys/rsa_public_invalid.pem');

const testCrypt = (text) => {
    console.log('Initial value: ', text);
    var buffer = new Buffer(text);
    var encrypted2 = crypto.publicEncrypt(publicKey, buffer);
    const encrypted = encrypted2.toString("base64");
    console.log('Encrypted value: ', encrypted);

    var buffer = new Buffer(encrypted, "base64");
    var decrypted2 = crypto.privateDecrypt(privateKey, buffer);
    const decrypted = decrypted2.toString("utf8");
    console.log('Decrypted value: ', decrypted);
}

module.exports = {
    testCrypt
};