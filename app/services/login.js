"use strict";
require('dotenv').config();
const   request = require('request'),
        fs = require('fs');



module.exports = {
    getToken(credentials){
        return new Promise((resolve, reject) =>{
            request({
                url: process.env.API_TOKEN_URL,
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + credentials
                }
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
    
};

