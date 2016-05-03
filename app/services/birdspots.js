"use strict";
const https = require('https'),
      request = require('request');
require('dotenv').config();


module.exports = {
    getBirds(){
        let json = '';
        let url = process.env.API_URL;
        let path = '/api/v1/spots?key=' + process.env.API_KEY;
             
        return new Promise((resolve, reject) => {
            request({
                url: url + path,
                method: 'GET'
            }, function(error, response, body) {
                if (error) {
                   reject(new Error('Failed to load API: ' + error));
                }else{
                    resolve(body);
                }          
            });
        });
    }
};
 