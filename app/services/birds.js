"use strict";
require('dotenv').config();
const   request = require('request'),
        fs = require('fs'),
        path =  process.env.API_BIRDS_PATH,
        apikey = process.env.API_KEY,
        url = process.env.API_URL;



module.exports = {

    getBirds(){
        return new Promise((resolve, reject) =>{
            request({
                url: url + path + apikey,
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
    },
    
    saveBirdsToFile(birds){
        return new Promise((resolve, reject) =>{
            fs.writeFile("./files/birds.json", birds,(error) =>{
                if(error) {
                    reject("Error when caching positions: " + error);
                }
                resolve();
            }); 
        });
    },
    
    readBirdsFromFile(){
        return new Promise((resolve, reject) =>{
            fs.readFile("./files/birds.json", (error, data) =>{
                if(error) {
                    reject("Error when caching positions: " + error);
                }
                resolve(data);
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



