/**
 * create any class that extends from VirtualRepository,
 * and use functions as in the above function
 * @type {VirtualRepository}
 */
const VirtualRepository = require('../../../core/private/repository/virtual');
const Publisher = require('../../../core/publisher');

class MeanSum extends VirtualRepository {
    constructor({current, count}){
        super({current, count},'MeanSum');
    }

    async add({sum, overall}){

        await this.fetch();
        // *******************  All Calculations Go Here  *********************


        this.current = (this.current * this.count + sum * overall) / ( this.count + overall);
        this.count = this.count + overall;


        // *******************  End Calculations *********************
        return this.sync();
    }
}

const meanSum = new MeanSum({current:0, count:0});
Publisher.register('model', meanSum);

module.exports = meanSum;

