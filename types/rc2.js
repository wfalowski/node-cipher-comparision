const forge = require('node-forge');
const aesjs = require('aes-js');

const testCrypt = (text) => {
    console.log('Initial value: ', text);
    const textBytes = aesjs.utils.utf8.toBytes(text);
    
    // generate a random key and IV 
    const key = forge.random.getBytesSync(16);
    const iv = forge.random.getBytesSync(8);

    // encrypt some bytes 
    let cipher = forge.rc2.createEncryptionCipher(key);
    cipher.start(iv);
    cipher.update(forge.util.createBuffer(textBytes));
    cipher.finish();
    const encrypted = cipher.output;
    // outputs encrypted hex 
    console.log('Encrypted: ' , encrypted.toHex());

    // decrypt some bytes 
    cipher = forge.rc2.createDecryptionCipher(key);
    cipher.start(iv);
    cipher.update(encrypted);
    cipher.finish();
    // outputs decrypted hex 
    const decryptedBytes = cipher.output;
    const decryptedText = decryptedBytes.toString();

    console.log('Decrypted: ', decryptedText);
}

module.exports = {
    testCrypt
};