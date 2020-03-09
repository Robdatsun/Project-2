const db = require("../models");
const fetch = require('node-fetch');

module.exports = function (app) {


    app.get("/", function (req, res) {
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
        
        db.Stock.findAll()
            // grab symbols from seed database
            .then(function (result) {
                for (let i = 0; i < result.length; i++) {

                    let queryURL_news = "https://stocknewsapi.com/api/v1?tickers=" + result[i].dataValues.symbol.toUpperCase() + "&items=3&token=" + process.env.apiKeyStockNews;
                    queriesNews.push(fetch(queryURL_news));
                    let queryURL_stocks = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + result[i].dataValues.symbol.toUpperCase() + "&apikey=" + process.env.apiKeyAlphaVantage1;
                    queriesStocks.push(fetch(queryURL_stocks));
                }
                let queryURL_dow = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DOW&apikey=" + process.env.apiKeyAlphaVantage1;
                queriesdow.push(fetch(queryURL_dow));
                let queryURL_nasdaq = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NDAQ&apikey=" + process.env.apiKeyAlphaVantage1;
                queriesnasdaq.push(fetch(queryURL_nasdaq));
                let queryURL_snp = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SNP&apikey=" + process.env.apiKeyAlphaVantage1;
                queriessnp.push(fetch(queryURL_snp));
                return Promise.all(queriesdow);
            })
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        dow.push(json);
                    })
                })
                return Promise.all(queriesnasdaq);
            })
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        nasdaq.push(json);
                    })
                })
                return Promise.all(queriessnp);
            })
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        snp.push(json);
                    })
                })
                return Promise.all(queriesNews);
            })
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        newsResults.push(json);
                    })
                })
                return Promise.all(queriesStocks)
            })
            .then(async (results) => {
                await results.forEach(result => {
                    result.json().then(json => stocksResults.push(json))
                })
            })
            .then(results => {
                console.log(dow,"dow==========")
                console.log(nasdaq, "nasdaq=============")
                console.log(snp,"snp===========")
                let hbsObj = {
                    stocks: stocksResults,
                    news: newsResults,
                    dow: dow,
                    nasdaq: nasdaq,
                    snp: snp
                }
                // console.log(stocksResults, "====== stock ======");
                // console.log(newsResults, "====== news ========")

                res.render("index", hbsObj);
            })
            .catch((err) => { if (err) throw err });
    });
    // posting into database works
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