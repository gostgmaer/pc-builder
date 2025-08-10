const session = require("express-session");
const mongoSessionStore = require("connect-mongodb-session")(session);


const sessionStore = new mongoSessionStore({
    uri: "mongodb+srv://kishorAdmin:K3ck7q7qP2WAh3E@kishoradmindb.global.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000",
    collection: "sessions",
  });


  module.exports = sessionStore;