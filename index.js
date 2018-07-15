// Require modules
const fs = require('fs');
const tress = require('tress');
const needle = require('needle');
const cheerio = require('cheerio');

// Main url
const URL = 'http://megasoft.uz';
// Apps info
const result = [];

const q = tress((url, callback) => {
  needle.get(url, (err, res) => {
    
    if (err) throw err;
    // Page content
    const $ = cheerio.load(res.body);
    // Apps link block
    const appList = $('td[style="padding-left:20px;padding-top:16px;"]').children();
    
    if(url === URL){
      appList.each((idx, el) => {
        // List item element
        const li = el;
        // List item children elements
        const liChild = li.children;
        liChild.map((el, idx) => {
          // Adding links to the queue
          q.push(`http://megasoft.uz${el.attribs.href}`);
        })
      })
    } else {
      // App title
      const title = $('.title').html();
      
      // Adding app title to the result array
      result.push({
        title
      });
    }
    callback();
  });
  
}, 10);

q.push(URL);

// Do after finish
q.drain = function() {
  // Result file
  const file = 'result.json';
  // Create a resukt file
  fs.writeFile(file, JSON.stringify(result), {encoding: 'utf8'}, (err) => {
    if(err) throw err;
    console.log(`The result was succesfully saved in ${file}`);
  });
}