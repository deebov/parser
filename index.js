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

    const $ = cheerio.load(res.body);
    // Apps link block
    const appList = $('td[style="padding-left:20px;padding-top:16px;"]').children();

    if(url === 'http://megasoft.uz'){
      appList.each((idx, el) => {
        // List item element
        const li = el;
        // List item children elements
        const liChild = li.children;
        liChild.map((idx, el) => {
          // Adding links to the queue
          q.push(`http://megasoft.uz${idx.attribs.href}`);
        })
      })
    } else {
      // App title
      const title = $('.title').html();
      // Adding app title to the result array
      result.push({
        name: title
      });
    }
    callback();
  })
}, 10);

q.push(URL);
