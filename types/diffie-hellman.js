
const crypto = require('crypto');
const assert = require('assert');

const hash = (text) => {
    const hash = bcrypt.hashSync(text, 10);
    console.log('Hashed value: ', hash);
}

const compare = (hash1, hash2) => {
    const comparision = assert.strictEqual(hash1.toString('hex'), person2Secret.toString('hex'));
    console.log('Comparision result: ', comparision);
}

const testHash = () => {

    // Generate person1's keys...
    const person1 = crypto.createDiffieHellman(1024);
    const person1Key = person1.generateKeys();

    // Generate person2's keys...
    const person2 = crypto.createDiffieHellman(person1.getPrime(), person1.getGenerator());
    const person2Key = person2.generateKeys();

    // Exchange and generate the secret...
    const person1Secret = person1.computeSecret(person2Key);
    const person2Secret = person2.computeSecret(person1Key);

    console.log('Hashed first person: ', person1Secret.toString('hex'));
    console.log('Hashed second person: ', person2Secret.toString('hex'))

    // OK
    const comparision = person1Secret.toString('hex') === person2Secret.toString('hex');
    console.log('Comparision result: ', comparision);
}

module.exports = {
    hash,
    compare,
    testHash
};

