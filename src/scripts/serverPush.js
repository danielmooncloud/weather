const fs = require("fs");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);
const parallel = require("neo-async").parallel;

const dependencyTree = {
    "index.html": {
        "/manifest.json": "application/json",
        "/css/app.css": "text/css",
        "/css/images/cloud.png": "image/png",
        "/css/media.css": "text/css",
        "/scripts/vendor.bundle.js": "application/javascript",
        "/scripts/app.bundle.js": "application/javascript",
        "/scripts/angular-skycons.min.js": "application/javascript",
        "/views/daily.html": "text/html",
        "/views/hourly.html": "text/html",
        "/views/main.html": "text/html"
    }
}

const getIndex = (res, staticDir) => {
    return async cb => {
        try {
            const filepath = staticDir + "/" + "index.html";
            const data = await readFile(filepath, 'utf8')
            res.write(data);
            cb();
        } catch(err) {
            cb(err);
        }
    }
}


const getFiles = (res, config) => {
    const {staticDir, dependencies} = config;
    return Object.keys(dependencies).map(file => {
        return async (cb) => {
            try {
                const path = staticDir + file;
                const data = await readFile(path, 'utf8');
                res.push(file, {
                    request: {accept: "**/*"},
                    response: {'content-type': dependencies[file]}
                }).end(data);
                cb();
            } catch(err) {
                cb(err);
            }
        }
    })
}


const getDependencyMap = config => {
    const { staticDir, dependencyTree } = config;
    return (req, res, next) => {
        if(res.push) {
            const url = (req.url === "" || req.url === "/") ? "index.html" : req.url
            const dependencies = dependencyTree[url];
            const assets = [
                getIndex(res, staticDir), 
                ...getFiles(res, {staticDir, dependencies})
            ];
            parallel(assets, (err, results) => {
                if(err) {
                    next(err);
                }
                res.end();
            })
        } else {
            next();
        }
    }
}


module.exports = getDependencyMap({
    staticDir: "public",
    dependencyTree
});