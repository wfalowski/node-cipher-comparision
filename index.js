const inquirer = require('inquirer');
const chalk = require('chalk');

const AES = require('./types/aes');
const RC2 = require('./types/rc2');
const RSA = require('./types/rsa');
const RSA2 = require('./types/rsa2');
const BCRYPT = require('./types/bcrypt');
const BCRYPT2 = require('./types/bcrypt2');
const DIFFIEHELLMAN = require('./types/diffie-hellman');
const HMAC = require('./types/hmac');
const HMAC2 = require('./types/hmac2');

const log = console.log;

inquirer
    .prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'What do you want to do?',
            choices: [
                {
                    name: 'Test encryption mechanism',
                    value: 'test',
                },
                {
                    name: 'Encrypt some text',
                    value: 'encrypt'
                },
                {
                    name: 'Decrypt some text',
                    value: 'decrypt'
                },
                {
                    name: 'Compare hash',
                    value: 'hash'
                },
                {
                    name: 'Test all encryption mechanisms',
                    value: 'test-all'
                }
            ]
        },
        {
            type: 'list',
            name: 'type',
            message: 'What type do you need',
            choices: ['AES', 'RSA', 'RC2', 'BCRYPT', 'DIFFIE-HELLMAN'],
            filter: (val) => val.toLowerCase(),
            when: (answers) => {
                return (answers.operation !== 'test-all' && answers.operation !== 'hash')
            }
        },
        {
            type: 'list',
            name: 'type',
            message: 'What type do you need',
            choices: ['BCRYPT'],
            filter: (val) => val.toLowerCase(),
            when: (answers) => {
                return answers.operation === 'hash'
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to test',
            when: (answers) => {
                return (answers.operation === 'test' && answers.type !== 'aes')
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to test',
            when: (answers) => {
                return ((answers.operation === 'test' && answers.type === 'aes') || answers.operation === 'test-all')
            },
            validate: (value) => {
                return value.length % 16 === 0 || 'String must have 16 chars length';
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to compare',
            when: (answers) => {
                return answers.operation === 'hash'
            }
        },
        {
            type: 'input',
            name: 'hash',
            message: 'Type hash to test',
            when: (answers) => {
                return answers.operation === 'hash'
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to encrypt',
            when: (answers) => {
                return answers.operation === 'encrypt' && answers.type !== 'aes'
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to encrypt',
            when: (answers) => {
                return answers.operation === 'encrypt' && answers.type === 'aes'
            },
            validate: (value) => {
                return value.length % 16 === 0 || 'String must have 16 chars length';
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type encrypted value',
            when: (answers) => {
                return answers.operation === 'decrypt'
            }
        }
    ])
    .then(answers => {
        const { text, operation, type } = answers;
        try {
            switch (operation) {
                case 'test':
                    switch (type) {
                        case 'aes':
                            AES.testCrypt(text)
                            break;
                        case 'rsa':
                            RSA.testCrypt(text)
                            break;
                        case 'bcrypt':
                            BCRYPT.testHash(text);
                            break;
                        case 'rc2':
                            RC2.testCrypt(text);
                            break;
                        case 'diffie-hellman':
                            RC2.testCrypt(text);
                            break;
                        case 'hmac':
                            HMAC.testHash(text);
                            break;
                    }
                    break;
                case 'encrypt':
                    switch (type) {
                        case 'aes':
                            AES.encrypt(text);
                            break;
                        case 'rsa':
                            RSA.encrypt(text);
                            break;
                        case 'bcrypt': 
                            BCRYPT.hash(text);
                            break;
                    }
                    break;
                case 'decrypt':
                    switch (type) {
                        case 'aes':
                            AES.decrypt(text);
                            break;
                        case 'rsa':
                            RSA.decrypt(text);
                            break;
                        case 'bcrypt':
                            console.log(chalk.red('Hash function cannot be decrypted'))
                    }
                    break;
                case 'hash':
                    switch (type) {
                        case 'bcrypt':
                            BCRYPT.compare(text, answers.hash)
                            break;
                        case 'hmac':
                            HMAC.compare(text, answers.hash)
                            break;
                    }
                    break;
                case 'test-all':
                    console.log(chalk.blue('AES'))
                    console.time('AES time');
                    AES.testCrypt(text);
                    console.timeEnd('AES time');
                    console.log('\n');
                    console.log(chalk.blue('RC2'))
                    console.time('RC2 time');
                    RC2.testCrypt(text);
                    console.timeEnd('RC2 time');
                    console.log('\n');
                    console.log(chalk.blue('RSA'))
                    console.time('RSA time');
                    RSA.testCrypt(text);
                    console.timeEnd('RSA time');
                    console.log('\n');
                    console.log(chalk.blue('RSA2'))
                    console.time('RSA2 time');
                    RSA2.testCrypt(text);
                    console.timeEnd('RSA2 time');
                    console.log('\n');
                    console.log(chalk.blue('BCRYPT'));
                    console.time('BCRYPT time');
                    BCRYPT.testHash(text);
                    console.timeEnd('BCRYPT time');
                    console.log('\n');
                    console.log(chalk.blue('BCRYPT2'));
                    console.time('BCRYPT2 time');
                    BCRYPT2.testHash(text);
                    console.timeEnd('BCRYPT2 time');
                    console.log('\n');
                    console.log(chalk.blue('HMAC'))
                    console.time('HMAC time');
                    HMAC.testHash(text);
                    console.timeEnd('HMAC time');
                    console.log('\n');
                    console.log(chalk.blue('HMAC2'))
                    console.time('HMAC2 time');
                    HMAC.testHash(text);
                    console.timeEnd('HMAC2 time');
                    break;
            }
        } catch (err) {
            console.error(chalk.red(err));
        }

        log(chalk.green(`Operation completed`));
    });