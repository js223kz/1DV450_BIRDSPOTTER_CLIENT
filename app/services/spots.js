"use strict";
require('dotenv').config();
const request = require('request'),
      fs = require('fs'),
      path =  process.env.API_SPOTS_PATH,
      apikey = process.env.API_KEY,
      url = process.env.API_URL;


module.exports = {
    getSpots(){             
        return new Promise((resolve, reject) =>{
            request({
                url: url + path,
                method: 'GET',
                qs:{
                    key: apikey
                }
            }, (error, response, body) =>{
                let res = JSON.parse(body);
                
                if(res.status !== 200){
                    reject(res);
                }
                resolve(body);
            });
        });
    },

    
    createSpot(auth, spot){
        return new Promise((resolve, reject) => {
            let req = request({
                url: url + path,
                method: 'POST',
                qs: {
                    latitude: spot.latitude,
                    longitude: spot.longitude,
                    bird: spot.bird,
                    birdspotter: spot.birdspotter,
                    key: apikey
                },
                headers : {
                    "Authorization" : 'Token token='+auth,
                    "Content-Type": 'application/json'
                }
                
            }, (error, response, body) =>{
                let res = JSON.parse(body);
    
                if(res.status !== 201){
                    reject(res);
                }
                resolve(res);
            });
        });
    },
    
    updateSpot(auth, spot, id){
        return new Promise((resolve, reject) => {
            request({
                url: url + path + '/' + id + apikey,
                method: 'PUT',
                headers : {
                    "Authorization" :'Token token='+auth,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({spot})
                
            }, (error, response, body) =>{
               
                let res = JSON.parse(body);
                 
                if(body.status !== 200){
                   reject(res);
                }
                resolve(res);
            });
        });
    },
    
    deleteSpot(auth, id){
        return new Promise((resolve, reject) => {
            request({
                url: url + path + "/" + id,
                method: 'DELETE',
                qs: {
                    key: apikey
                },
                headers : {
                    "Authorization" : 'Token token='+auth,
                    "Content-Type": 'application/json'
                }
            }, (error, response, body) =>{
               
               let res = JSON.parse(body);
                
                if(res.status !== 204){
                    reject(res);
                }
                resolve(res);
            });
        });
    }
};
 