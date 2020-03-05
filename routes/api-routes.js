var Stock = require("../models/index.js");


// Routes
// =============================================================
module.exports = function(app) {

  // Get all stocks
  app.get("/api/stock/all", function(req, res) {
    Stock.findAll({}).then(function(results) {
      res.json(results);
    });

  });

  app.get('/api/stock/:sym');
  app.get('/api/stock/price/:sym');
  app.get('/api/stock/highLow/:sym');

  app.get('api/stock/news/:sym');

  

  
  app.post("/api/new", function(req, res) {

    console.log("Stocks:");
    console.log(req.body);

    Stock.create({
      sym: req.body
    }).then(function(results) {
      // `results` here would be the newly created chirp
      res.end();
    });

  });

};