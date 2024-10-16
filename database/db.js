const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('mongodb').MongoClient;

const { MongoClient } = require('mongodb');

let database

const initDb = (callback) => {
    if (database) {
        console.log('Db already initialized')
        return callback(null, database)
    }
    MongoClient.connect(process.env.DB_URL)
        .then((client) => {
            database = client;
            callback(null, database)
        })
        .catch((err) => {
            callback(err, null)
        })
}

const getDatabase = () => {
    if(!database) {
        throw Error('Db not initialized')
    }
    return database
}

module.exports = {
    initDb,
    getDatabase
}