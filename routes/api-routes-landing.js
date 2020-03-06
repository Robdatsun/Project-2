const db = require("../models");

module.exports = function (app) {
    let stocksSearch;
    let newsSearch;
    app.get("/api", function (req, res) {
        db.ProfStock.findAll().then(function (result) { // grab symbols from seed database
            stocksSearch = { symbols: result };
            // res.json(stocksSearch);
           return db.ProfNews.findAll();
        }).then(function (result) { // grab topics from seed database
            newsSearch = { topics: result };

            res.json({stocks: stocksSearch, news: newsSearch});
            // res.json(newsSearch);
        })

        /// how to chain to make an ajax call to grab info from stocks api and news api then render

    });

    app.post("/api/interests/news", function (req, res) {
        db.ProfNews.create({
            topic: req.body.topic
        })
        .then(function (result){
            res.json(true);
        })
        .catch(function (err){
            res.json(err);
        })
    })

    app.post("/api/interests/symbols", function (req,res){
        db.ProfStock.create({
            symbol: req.body.symbol
        })
        .then(function(result){
            res.json(true);
        })
        .catch(function(err){
            res.json(err);
        });
    });
}