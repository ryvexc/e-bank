import { MongoClient } from 'mongodb';

const client = new MongoClient("MONGODB_URI=mongodb+srv://e-bank.8669arl.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
export async function setupDB(db) {
    db.collection('users').createIndex({ email: 1 }, { unique: true });
}

export default async function database(req, res, next) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db("Authenticate");
    await setupDb(req.db);
    return next();
}