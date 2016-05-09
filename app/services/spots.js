"use strict";

const request = require('request');
require('dotenv').config();


module.exports = {
    getSpots(){
        let url = process.env.API_URL;
        let path = '/api/v1/spots' + process.env.API_KEY;
             
        return new Promise((resolve, reject) => {
            request({
                url: url + path,
                method: 'GET'
            }, (error, response, body) =>{
                if(error){
                    reject(error)
                } 
                if(response.statusCode !== 200){
                    reject({statusCode: response.statusCode, message: body});
                } 
                resolve(body);
            });
        });
    },
    
    deleteSpot(auth, id){
        let url = process.env.API_URL;
        let path = '/api/v1/spots/' + id + process.env.API_KEY;
        
        return new Promise((resolve, reject) => {
            request({
                url: url + path,
                method: 'DELETE',
                headers : {
                    "Authorization" : auth
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
    }
};
 