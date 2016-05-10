"use strict";
require('dotenv').config();
const request = require('request'),
      path =  process.env.API_SPOTS_PATH,
      apikey = process.env.API_KEY,
      url = process.env.API_URL;


module.exports = {
    getSpots(){             
        return new Promise((resolve, reject) => {
            request({
                url: url + path + apikey,
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
    
    createSpot(auth, spot){
        /*let lat = '&latitude=' + spot.latitude;
        let lng = '&longitude=' + spot.longitude;
        let bird= '&bird=' + spot.bird;
        let birdspotter = '&birdspotter=' + spot.birdspotter;*/
        
        return new Promise((resolve, reject) => {
            request({
                url: url + path + apikey,
                method: 'POST',
                headers : {
                    "Authorization" : auth,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({spot})
                
            }, (error, response, body) =>{
                if(error){
                    reject(error)
                } 
                if(response.statusCode !== 201){
                    reject({statusCode: response.statusCode, message: body});
                } 
                resolve(body);
            });
        });
    },
    
    updateSpot(auth, spot, id){
        return new Promise((resolve, reject) => {
            request({
                url: url + path + '/' + id + apikey,
                method: 'PUT',
                headers : {
                    "Authorization" : auth,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({spot})
                
            }, (error, response, body) =>{
                if(error){
                    reject(error)
                } 
                if(response.statusCode !== 201){
                    reject({statusCode: response.statusCode, message: body});
                } 
                resolve(body);
            });
        });
    },
    
    deleteSpot(auth, id){
       
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
 