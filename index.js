import fs from "fs"
import http from "http"


http.createServer((req, res) => {
    const URL = req.url
    const METHOD = req.method
    const PATH = "./models/game.json"
    switch (METHOD) {
        case "GET":
            if (URL === "/all") {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(game))
                })
            }

            else if (URL === "/all?category=trending") {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const result = game.filter(itm => itm.category === "trending")
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(result))
                })
            }

            else if (URL === "/all?category=new_releases") {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const result = game.filter(itm => itm.category === "new_releases")
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(result))
                })
            }

            else if (URL === "/all?category=coming_soon") {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const result = game.filter(itm => itm.category === "coming_soon")
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(result))
                })
            }

            else if (URL === "/all?category=sale_deals") {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const result = game.filter(itm => itm.category === "sale_deals")
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(result))
                })
            }

            else if ((URL === "/all?category=free_to_play")) {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const result = game.filter(itm => itm.category === "free_to_play")
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(result))
                })
            }

            else if ((URL.includes("/all?q="))) {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const regexp = new RegExp(URL.split("/all?q=")[1], "gi")
                    const result = game.filter(itm => itm.title.match(regexp))
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(result))
                })
            }

            else if (URL === "/all?isbought=true") {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const result = game.filter(itm => itm.isbought === "true")
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(result))
                })
            }

            else if (URL === "/all?isFav=true") {
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const result = game.filter(itm => itm.isFav === "true")
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(result))
                })
            } else {
                res.writeHead(400, { "Content-type": "application/json" })
                res.end(JSON.stringify({ "Bad Request": 400 }))
            }
            return;


        case "POST":
            if(URL === "/newGame") {
                req.on("data", chunk => {
                    fs.readFile(PATH, (err, data) => {
                        if (err) throw err
                        const obj = JSON.parse(chunk)
                        const game = JSON.parse(data)

                        game.push(obj)

                        fs.writeFile(PATH, JSON.stringify(game, null, 4), (err) => {
                            if (err) throw err
                        })
                        res.writeHead(201, { "Content-type": "application/json" })
                        res.end(JSON.stringify(obj))
                    })
                })
            } else {
                res.writeHead(400, { "Content-type": "application/json" })
                res.end(JSON.stringify({ "Bad Request": 400 }))
            }
            return;


        case "PUT": 
            if(!isNaN(URL.split("/all/")[1])) {
                const id = +URL.split("/all/")[1]
                req.on("data", chunk => {
                    fs.readFile(PATH, (err, data) => {
                        if (err) throw err
                        const obj = JSON.parse(chunk)
                        const game = JSON.parse(data)

                        for (let i = 0; i < game.length; i++) {
                            if (+game[i].id == id) {
                                game.splice(i, 1, obj)
                            }
                        }

                        fs.writeFile(PATH, JSON.stringify(game, null, 4), (err) => {
                            if (err) throw err
                        })
                        res.writeHead(201, { "Content-type": "application/json" })
                        res.end(JSON.stringify(obj))
                    })
                })
            } else {
                res.writeHead(400, { "Content-type": "application/json" })
                res.end(JSON.stringify({ "Bad Request": 400 }))
            }
            return;


        case "DELETE": 
            if(!isNaN(URL.split("/all/")[1])) {
                const id = +URL.split("/all/")[1]
                fs.readFile(PATH, (err, data) => {
                    if (err) throw err
                    const game = JSON.parse(data)
                    const result = game.filter(itm => +itm.id !== id)
                    fs.writeFile(PATH, JSON.stringify(result, null, 4), (err) => {
                        if (err) throw err
                    })
                    res.writeHead(200, { "Content-type": "application/json" })
                    res.end(JSON.stringify(game))
                })
            }
        return;


        default: res.writeHead(405, { "Content-type": "application/json" })
            res.end(JSON.stringify({ "Method Not Allowed": 405 }))
    }



})
    .listen(process.env.PORT, () => {
        console.log(process.env.PORT)
    })