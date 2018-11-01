/**
 * Intended to publish all registered repositories to public API
 * Repositories will be available through public api, including fields and functions.
 * Functions will be directly invoked, fields will be pulled from database;
 * fields and functions starting with _ will be treated as private, and cannot be set
 */
class Publisher {

    static register(key, isntance){
        Publisher._published[key] = isntance;
    }
}
Publisher._published = {};

module.exports = Publisher;
