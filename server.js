const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://www.pravda.com.ua/';
const headers = {'User-Agent': 'Chrome/51.0.2704.103'};
var fs = require('fs');
var outputFilename = './war.json';


rp({url:url, headers: headers})
  .then(function(html){
    //success!
    const $ = cheerio.load(html);


    const warItems = [];
    for (let i = 0; i < 13; i++) {
        warItems.push($('.war_num', html)[i].children[0].data);
    }

    // console.log('this is my stuff: ' + warItems);
    // console.log(html);

    // let numbersOnly = (val) => {
    //   if (typeof(val) === 'number') {
    //     return val;
    //   }
    // }
    console.log('warItems: ' + warItems);

    // let numbers = warItems.filter(Number);
    // console.log('numbers: ' + numbers);

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

    
  })
  .catch(function(err){
    console.log(err);
  });