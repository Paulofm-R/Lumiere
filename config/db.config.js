const config = {
    /* don't expose password or any sensitive info, done only for demo */
    // if environment variables are not defined, use default values
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME
};

config.URL = `mongodb+srv://${config.USER}:${config.PASSWORD}@cluster0.on3a1.mongodb.net/${config.DB}?retryWrites=true&w=majority`;
module.exports = config;