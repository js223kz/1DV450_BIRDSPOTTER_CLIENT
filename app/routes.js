"use strict";
const birdspots = require('./services/birdspots');


// expose the routes to our app with module.exports
module.exports = function(app) {
    
    // routes ======================================================================

    // application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    app.get('/birdspots', function(req, res) {
      birdspots.getBirds()
          .then((data) => {
          console.log(data)
        })
          .catch((err) => {
              console.error(err)
                  
            });



    });
};


