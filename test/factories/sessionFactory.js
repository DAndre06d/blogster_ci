const Keygrip = require("keygrip");
const keys = require("../../config/keys");
const keygrip = new Keygrip([keys.cookieKey]);
module.exports = () => {
    const sessionObject = {
        passport: {
            user: "6773fdd046a6023b3859e3e5",
        },
    };
    const session = Buffer.from(JSON.stringify(sessionObject)).toString(
        "base64"
    );
    const sig = keygrip.sign("session=" + session);
    return { session, sig };
};
