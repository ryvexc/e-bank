import { MongoClient, ServerApiVersion } from 'mongodb';

global.mongo = global.mongo || {}

export async function getMongoClient() {
    if (!global.mongo.client) {
        const uri = "mongodb+srv://Ryze:alfapro14@e-bank.8669arl.mongodb.net/?retryWrites=true&w=majority";
        global.mongo.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    }
    await global.mongo.client.connect()
    return global.mongo.client
}

export default async function database(req, res, next) {
    if (!global.mongo.client) {
        const uri = "mongodb+srv://Ryze:alfapro14@e-bank.8669arl.mongodb.net/?retryWrites=true&w=majority";
        global.mongo.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    }
    req.dbClient = await getMongoClient()
    req.db = req.dbClient.db()
    if (!indexesCreated) await createIndexes(req.db);
    return next();
}