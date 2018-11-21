const CryptoJS = require('crypto-js');
const redis = require('../../redis-client/index');
const { ENCRYPTION_KEY } = require('../../../../config/index');

/**
 * In order to have standard flow with redis, and get further software updates it is secure to
 * inherit all repository classes from VirtualRepository, which provides utility functions,
 * that will be used while pulling and updating model from database.
  */
class VirtualRepository {
    constructor(params, modelName){
        if(!modelName){
            throw new Error("Expected unique model name, but provided undefined");
        }
        this.name = modelName;
        this.fetch().then((resp)=>{
            if(!resp){
                console.log('Creating model with provided arguments ...');
                this.fromJson(params);
                this.sync().then();
            }else{
                console.log('Loading model from database');
            }
        });
    }

    /**
     * Read model from database
     * Function should be called before any read or write operation
     * @returns {Promise<void>}
     */
    async fetch({ v }){
        const version = await redis.getAsync('version');
        const json = await redis.getAsync(this.name + '_v' +  (v || version));
        if(json){
            const resp  = this.fromJson(json);
            return resp;
        }
        return json;
    }

    /**
     * Writes local changes to database
     * Function should be called after any write operation
     * @returns {Promise<>}
     */
     async sync(){
        const json = this.toJson();
        let version = await redis.getAsync('version');
        if(!version){
            version = 1;
        } else {
            version++;
        }
        await redis.setAsync('version', version);
        await redis.setAsync(this.name + '_v' +  version, JSON.stringify(json));
        console.log(`syncing model ${JSON.stringify(this.toJson())}`);
        console.log(`current version is ${version}`);
        return { ...json, version};
     }

     async lastVersion(){
        let version = await redis.getAsync('version');
        return version;
     }

    toJson(){
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            a[b] = this[b];
            return a;
        }, {});
     }

     fromJson(jsonStr){
         let json = jsonStr;
         if(typeof json === 'string'){
             json = JSON.parse(jsonStr);
         }
        for(let key in json){
            this[key] = json[key];
        }
        return this;
     }

    /**
     * Export encrypted Model
     * @returns {}
     */
    export(){
        return CryptoJS.AES.encrypt(JSON.stringify(this.toJson()), ENCRYPTION_KEY).toString();
     }

    /**
     * import encrypted data to Model
     * @returns {}
     */
    import(encryptedData){
        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        return this.fromJson(decryptedData);
    }
 }

 module.exports = VirtualRepository;
