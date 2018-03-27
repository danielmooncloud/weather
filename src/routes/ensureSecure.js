const ensureSecure = port => (req, res, next) => {
    if(req.secure) {
        return next();
    }
    console.log("redirecting to secure connection");
    res.redirect("https://" + req.hostname + ":" + port + req.url);
}

module.exports = ensureSecure;