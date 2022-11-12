//Get the environment variables
require('dotenv').config({ path: '../.env' });

const mongoConnection = process.env.MONGO_KEY;
const root = process.env.ROOT;
const port = process.env.SERVER_PORT;

module.exports = {
    mongoConnection: mongoConnection,
    root: root,
    port: port,
    stripeKey: process.env.STRIPE_PUBLISHABLE_KEY
}