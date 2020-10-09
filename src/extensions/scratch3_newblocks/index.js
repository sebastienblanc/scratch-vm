const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const nets = require('nets');
const serverTimeoutMs = 10000;
class Scratch3NewBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'newblocks',
            name: 'New Blocks',
            blocks: [
                {
                    opcode: 'writeLog',
                    blockType: BlockType.REPORTER,
                    text: 'log [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
                    }
                },
                {
                    opcode: 'createPod',
                    blockType: BlockType.REPORTER,
                    text: 'Create Pod [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "MyPod"
                        }
                    }
                }
            ],
            menus: {
            }
        };
    }

    writeLog (args) {
        const text = Cast.toString(args.TEXT);
        const urlBase = 'http://scratch-scratch.apps.doomk8s.sebi-on-aws.com/pods/default';
        //window.alert(text);
        const translatePromise = new Promise(resolve => {
            nets({
                url: urlBase,
                timeout: serverTimeoutMs
            }, (err, res, body) => {
                if (err) {
                    log.warn(`error fetching translate result! ${res}`);
                    resolve('');
                    return '';
                }
                const translated = JSON.parse(body);
                const podName = translated[0].metadata.name;
                resolve(podName);
                return podName;
            });

        });
        translatePromise.then(translatedText => translatedText);
        log.log(translatePromise);
        return translatePromise;
       
    }

    createPod (args) {
        const text = Cast.toString(args.TEXT);
        const urlBase = 'http://scratch-scratch.apps.doomk8s.sebi-on-aws.com/pods/create/'+text;
        //window.alert(text);
        const translatePromise = new Promise(resolve => {
            nets({
                url: urlBase,
                timeout: serverTimeoutMs
            }, (err, res, body) => {
                if (err) {
                    log.warn(`error fetching translate result! ${res}`);
                    resolve('');
                    return '';
                }
                const translated = JSON.parse(body);
                const podName = translated.metadata.name;
                resolve(podName);
                return podName;
            });

        });
        translatePromise.then(translatedText => translatedText);
        log.log(translatePromise);
        return translatePromise;
       
    }
}

module.exports = Scratch3NewBlocks;