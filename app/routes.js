"use strict";
const   spots = require('./services/spots'),
        birds = require('./services/birds'),
        auth = require('./services/authenticate')
    


// expose the routes to our app with module.exports
module.exports = function(app) {
    
    // routes ======================================================================

    // application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendFile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    // spots -------------------------------------------------------------
    app.get('/spots', (req, res) => {
      spots.getSpots().then((data) => {
            res.send(data);
            })
            .catch((err) => {
                res.send(err);
            });
        });
    
    // birds -------------------------------------------------------------
    app.get('/birds', (req, res)=> {
      birds.getBirds().then((data) => {
            res.send(data);
            })
            .catch((err) => {
                res.send(err);
            });
        });
    
    // get token restricted actions -------------------------------------------------------------
    app.post('/authenticate/:auth', (req, res) =>{
        let test = req.params.auth;
        auth.getToken(test).then((data) => {
            res.send(data);
            })
            .catch((err) => {
               res.send(err);
            });
    });
};


