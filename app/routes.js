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
        
        spots.getSpots()
            .then((response) =>{
            console.log("getSpots");
                res.send(response);
            }).catch((err) =>{
                res.status(err.status).send(err.message);
        });  
    });
    
    app.post('/spots', (req, res) => {
        
         let auth = req.headers.authorization;
         let spot = req.body.object;
  
        spots.createSpot(auth, spot).then((response) => {
            
            res.send(response);
            })
            .catch((err) => {
                res.status(err.status).send(err.message);
            });
    });
    
    app.put('/spots/:id', (req, res) => {
         let auth = req.headers.authorization;
         let spot = req.body.spot;
         let id = req.params.id;
         
         spots.updateSpot(auth, spot, id).then((response) => {
            res.send(response);
            })
            .catch((err) => {
                res.status(err.status).send(err.message);
            });
      
    });
    
    app.delete('/spots/:id', (req, res) => {
        let auth = req.headers.authorization
        let id = req.params.id;
        console.log("server id" + id);
        spots.deleteSpot(auth, id)
            .then((response) => {
            res.send(response);
            })
            .catch((err) => {
               res.status(err.status).send(err.message);
            });
    });
    
    // birds -------------------------------------------------------------
    app.get('/birds', (req, res)=> {
        birds.getBirds().then((response) =>{
            console.log("getBirds");
             res.send(response);
        }).catch((err) =>{
            res.status(err.status).send(err.message);
        });
    });
    
    app.post('/birds', (req, res) => {
        let auth = req.headers.authorization;
        let bird = req.body.object;
         
        birds.createBird(auth, bird).then((response) => {
            console.log(response);
            res.send(response);
            })
            .catch((err) => {
            console.log(err);
                res.status(err.status).send(err.message);
            });
    });
    
    // returns token for restricted actions when user logs in -------------------------------------------------------------
    app.post('/login/:auth', (req, res) =>{
        let credentials = req.params.auth;
         login.getToken(credentials)
            .then((response) => {
            res.send(response);
            })
            .catch((err) => {
               res.status(err.status).send(err.message);
            });
    });
};



