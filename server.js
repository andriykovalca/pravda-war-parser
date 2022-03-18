const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://www.pravda.com.ua/';
const headers = {'User-Agent': 'Chrome/51.0.2704.103'};
var fs = require('fs');
var outputFilename = './war.json';
var http = require("http");
const express = require('express');
const app = express();
var cors = require('cors')


rp({url:url, headers: headers})
  .then(function(html){
    //success!
    const $ = cheerio.load(html);


    const warItems = [];
    for (let i = 0; i < 13; i++) {
        warItems.push($('.war_num', html)[i].children[0].data);
    }

    console.log('warItems: ' + warItems);

    for (let i = 0; i < 13; i++) {
      warItems[i] = warItems[i].replace(/[^0-9.]/g, '');
    }

    console.log('warItemsNEW: ' + warItems)




    fs.writeFile(outputFilename, JSON.stringify(warItems, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
    }); 

    // Defining get request at '/' route
    app.get('/', function(req, res) {
      res.json(warItems);
    });

    app.use(cors()); // <---- use cors middleware
      
    // Setting the server to listen at port 3000
    app.listen(process.env.PORT || 3000, function(req, res) {
      console.log("Server is running at port 3000");
    });
  })
  .catch(function(err){
    console.log(err);
  });

