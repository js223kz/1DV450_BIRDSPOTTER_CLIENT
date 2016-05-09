"use strict";
const request = require('request');
require('dotenv').config();


module.exports = {

    getBirds(){
        let url = process.env.API_URL;
        let path = '/api/v1/birds?key=' + process.env.API_KEY;

        return new Promise((resolve, reject) => {
            request({
                url: url + path,
                method: 'GET'
            }, (error, response, body) =>{
                if(error){
                    reject(error);
                } 
                if(response.statusCode !== 200){
                     reject({statusCode: response.statusCode, message: body});
                }
                resolve(body);
            });
        });
    }
};


/*var key = <my key>,
    secret = <my secret>,
    https = require("https"),
    https_options = {
        "host": <host>,
        "path": <path>,
        "port": <port>,
        "method": <method>,
        "headers": {
            "Authorization": "Basic " + new Buffer(key + ":" + secret, "utf8").toString("base64")
        }
    },
    request = https.request(https_options, function(response) {
        // Handle response
    });*/



