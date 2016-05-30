"use strict";
const   spots = require('./services/spots'),
        birds = require('./services/birds'),
        login = require('./services/login');
    


// expose the routes to our app with module.exports
module.exports = function(app) {
    
    // routes ======================================================================

    // application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendFile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    // spots -------------------------------------------------------------
    app.get('/spots', (req, res) => {
        
        spots.readSpotsFromFile().then((spots) =>{
                res.send(spots);
            }).catch((error) =>{
                res.status(500).send(err);
        });  
    });
    
    app.post('/spots', (req, res) => {
         let auth = req.headers.authorization;
         let spot = req.body.spot;
         
         spots.createSpot(auth, spot).then((data) => {
            res.send(data);
            })
            .catch((err) => {
             console.log(err);
                res.status(err.statusCode).send(err.message);
            });
      
    });
    
    app.put('/spots/:id', (req, res) => {
         let auth = req.headers.authorization;
         let spot = req.body.spot;
         let id = req.params.id;
         
         spots.updateSpot(auth, spot, id).then((data) => {
             console.log(data);
            res.send(data);
            })
            .catch((err) => {
             console.log(err);
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
                console.log(err);
               res.status(err.statusCode).send(err.message);
            });
    });
    
    // birds -------------------------------------------------------------
    app.get('/birds', (req, res)=> {
        birds.readBirdsFromFile().then((birds) =>{
             res.send(birds);
        }).catch((error) =>{
            res.status(500).send(err);
        });
    });
    
    // returns token for restricted actions when user logs in -------------------------------------------------------------
    app.post('/login/:auth', (req, res) =>{
        let credentials = req.params.auth;
         login.getToken(credentials).then((data) => {
             console.log(data);
            res.send(data);
            })
            .catch((err) => {
                console.log(err);
               res.status(err.statusCode).send(err.message);
            });
    });
};

/*birds.getBirds().then((data) => {
            res.send(data);
            })
            .catch((err) => {
                res.status(err.statusCode).send(err.message);
            });*/


