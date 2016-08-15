"use strict";
//require('dotenv').config();
const   request = require('request'),
        fs = require('fs'),
        path =  'birds',
        apikey = '164b564282b60d8f6ef2661d5ad1bb10cbcbbf0dbe093a351de04f4ce4c927b1',
        url = 'https://birdspotterdev.herokuapp.com/api/v1/;



module.exports = {

    getBirds(){
        return new Promise((resolve, reject) =>{
            request({
                url: url + path,
                method: 'GET',
                qs: {
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
    
    createBird(auth, bird){
        let name = 'name=' + bird.name;
        let latin = '&latin=' + bird.latin;
        let reg = '&regularity=' + bird.regularity;
        return new Promise((resolve, reject) => {
            
            request({
                url: url + path,
                method: 'POST',
                qs: {
                    name: bird.name,
                    latin: bird.latin,
                    regularity: bird.regularity,
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



