const CryptoJS = require('crypto-js');
const redis = require('../../redis-client/index');
const { ENCRYPTION_KEY } = require('../../../../config/index');

/**
 * In order to have standard flow with redis, and get further software updates it is secure to
 * inherit all repository classes from VirtualRepository, which provides utility functions,
 * that will be used while pulling and updating model from database.
  */
class VirtualRepository {
    constructor(params,modelName){
        if(!modelName){
            throw new Error("Expected unique model name, but provided undefined");
        }
        this.fromJson(params);
        this.name = modelName;
        this.sync().then();
    }

    /**
     * Read model from database
     * Function should be called before any read or write operation
     * @returns {Promise<void>}
     */
    async fetch(){
        const json = await redis.getAsync(this.name);
        const resp  = this.fromJson(json);
        return resp;
    }

    /**
     * Writes local changes to database
     * Function should be called after any write operation
     * @returns {Promise<void>}
     */
     async sync(){
        const json = this.toJson();
        await redis.setAsync(this.name, JSON.stringify(json));
        return json;
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
