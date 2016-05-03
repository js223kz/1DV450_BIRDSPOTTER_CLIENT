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
    
    app.get('/spots', (req, res) => {
      spots.getSpots().then((data) => {
            console.log(data)
            })
            .catch((err) => {
                console.error(err)
            });
        });
    
    app.get('/birds', (req, res)=> {
      birds.getBirds().then((data) => {
            console.log(data)
            })
            .catch((err) => {
                console.error(err)
            });
        });
    
    app.get('/authenticate/:auth', (req, res) =>{
        let test = req.params.auth;
        auth.getToken(test).then((data) => {
            console.log(data)
            })
            .catch((err) => {
                console.error(err)
            });
    });
};


