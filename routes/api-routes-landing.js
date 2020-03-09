// dependencies
const db = require("../models");
const fetch = require('node-fetch');
// exporting
module.exports = function (app) {
    // get route
    app.get("/", function (req, res) {
        // arrays to keep results
        let queriesNews = [];
        let queriesStocks = [];
        let newsResults = [];
        let stocksResults = [];
        let queriesdow = [];
        let dow = [];
        let queriesnasdaq = [];
        let nasdaq = [];
        let queriessnp = [];
        let snp = [];        
        // find all sequelize queries
        db.Stock.findAll()
            // grab symbols from seed database
            .then(function (result) {
                // loop through seed results and pass on to fetch data from api
                for (let i = 0; i < result.length; i++) {
                    let queryURL_news = "https://stocknewsapi.com/api/v1?tickers=" + result[i].dataValues.symbol.toUpperCase() + "&items=3&token=" + process.env.apiKeyStockNews;
                    queriesNews.push(fetch(queryURL_news));
                    let queryURL_stocks = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + result[i].dataValues.symbol.toUpperCase() + "&apikey=" + process.env.apiKeyAlphaVantage1;
                    queriesStocks.push(fetch(queryURL_stocks));
                }

                let queryURL_dow = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DOW&apikey=" + process.env.apiKeyAlphaVantage2;
                queriesdow.push(fetch(queryURL_dow));
                let queryURL_nasdaq = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NDAQ&apikey=" + process.env.apiKeyAlphaVantage3;
                queriesnasdaq.push(fetch(queryURL_nasdaq));
                let queryURL_snp = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SNP&apikey=" + process.env.apiKeyAlphaVantage4;
                queriessnp.push(fetch(queryURL_snp));
                // fulfill a promise
                return Promise.all(queriesdow);
            })
            // turn results into json format
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        dow.push(json);
                    })
                })
                // fulfill a promise
                return Promise.all(queriesnasdaq);
            })
            // turn results into json format
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        nasdaq.push(json);
                    })
                })
                // fulfill a promise
                return Promise.all(queriessnp);
            })
            // turn results into json format
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        snp.push(json);
                    })
                })
                // fulfill a promise
                return Promise.all(queriesNews);
            })
            // turn results into json format
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        newsResults.push(json);
                    })
                })
                // fulfill another promise
                return Promise.all(queriesStocks)
            })
            // turn results into json format
            // async|await so that script doesn't move on to the next step
            .then(async (results) => {
                await results.forEach(result => {
                    result.json().then(json => stocksResults.push(json))
                })
            })
            // put all results into an object
            .then(results => {
                let hbsObj = {
                    stocks: stocksResults,
                    news: newsResults,
                    dow: dow,
                    nasdaq: nasdaq,
                    snp: snp
                }
                // pass the object into index.handlebars
                res.render("index", hbsObj);
            })
            // catching error
            .catch((err) => { if (err) throw err });
    });
    // post route
    app.post("/api/symbols", function (req, res) {
        db.Stock.create({
            symbol: req.body.symbol
        })
            .then(function (result) {
                res.json(true);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}