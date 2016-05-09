"use strict";
const   spots = require('./services/spots'),
        birds = require('./services/birds'),
        auth = require('./services/login')
    


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
                res.status(err.statusCode).send(err.message);
            });
        });
    
    app.delete('/spots/:id', (req, res) => {
        let auth = req.headers.authorization
        let id = req.params.id;
        spots.deleteSpot(auth, id).then((data) => {
            res.send(data);
            })
            .catch((err) => {
               res.status(err.statusCode).send(err.message);
            });
        });
    
    // birds -------------------------------------------------------------
    app.get('/birds', (req, res)=> {
      birds.getBirds().then((data) => {
            res.send(data);
            })
            .catch((err) => {
                res.status(err.statusCode).send(err.message);
            });
        });
    
    // returns token for restricted actions when user logs in -------------------------------------------------------------
    app.post('/login/:auth', (req, res) =>{
        let auth = req.params.auth;
        auth.getToken(auth).then((data) => {
            res.send(data);
            })
            .catch((err) => {
               res.status(err.statusCode).send(err.message);
            });
    });
};


