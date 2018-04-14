const request = require('request');
const iconv = require('iconv-lite');

const URL = 'http://topmusic.uz';
const requestOptions = {
  url: 'http://megasoft.uz',
  encoding: null
}
request(requestOptions, (err, res, body) => {
  if (err) throw err;
  console.log(res.statusCode);
  console.log(iconv.decode(body, 'win1251'));
})
