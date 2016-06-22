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
    
    saveSpotsToFile(spots){
        return new Promise((resolve, reject) =>{
            fs.writeFile("./files/spots.json", spots,(error) =>{
                if(error) {
                    reject("Error when saving spots to file: " + error);
                }
                resolve();
            }); 
        });
    },
    
    readSpotsFromFile(){
        return new Promise((resolve, reject) =>{
            fs.readFile("./files/spots.json", (error, data) =>{
                if(error) {
                    reject("Error when reading spots from file: " + error);
                }
                resolve(data);
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
       
        let path = '/api/v1/spots/' + id + process.env.API_KEY;
        
        return new Promise((resolve, reject) => {
            request({
                url: url + path,
                method: 'DELETE',
                headers : {
                    "Authorization" : auth
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
 