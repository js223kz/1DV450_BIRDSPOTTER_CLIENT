"use strict";
const request = require('request');
require('dotenv').config();


module.exports = {

    getToken(auth){
        return new Promise((resolve, reject) => {
            request({
                url: process.env.API_TOKEN_URL,
                method: 'GET',
                headers: {
                    "Authorization": 'Basic ' + auth
                    }
            }, (error, response, body) =>{
                if (error) {
                   reject(new Error('Failed to load API: ' + error));
                }else{
                    resolve(body);
                }          
            });
        });
    }
};