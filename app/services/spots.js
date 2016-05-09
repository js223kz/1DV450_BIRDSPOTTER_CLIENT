"use strict";
require('dotenv').config();
const request = require('request'),
      url = process.env.API_URL;


module.exports = {
    getSpots(){
       // let url = process.env.API_URL;
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
    
    createSpot(auth, spot){
        let path = '/api/v1/spots/' + process.env.API_KEY;
        let lat = '&latitude=' + spot.latitude;
        let lng = '&longitude=' + spot.longitude;
        let bird= '&bird=' + spot.bird;
        let birdspotter = '&birdspotter=' + spot.birdspotter;
        
        return new Promise((resolve, reject) => {
            request({
                url: url + path,
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
    
    
 /*   request({
    url: 'https://modulus.io/contact/demo', //URL to hit
    qs: {from: 'blog example', time: +new Date()}, //Query string data
    method: 'POST',
    headers: {
        'Content-Type': 'MyContentType',
        'Custom-Header': 'Custom Value'
    },
    body: 'Hello Hello! String body!' //Set the body as a string
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});*/
    
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
 