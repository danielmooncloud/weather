
const fs = require("fs");

const serveCompressed = contentType => (req, res, next) => {
    if (req.acceptsEncodings().indexOf('br') === -1 || !fs.existsSync(`./public/${req.url.slice(1)}.br`)) {
        return next()
    }
  
    req.url = `${req.url}.br`
  
    res.set('Content-Encoding', 'br')
    res.set('Content-Type', contentType)
    next()
}

module.exports = serveCompressed;