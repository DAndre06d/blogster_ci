require("dotenv").config();
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGODBURI,
    cookieKey: process.env.COOKIE_KEY,
};
