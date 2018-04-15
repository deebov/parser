const needle = require('needle');
const tress = require('tress');

const URL = 'http://megasoft.uz';

needle.get(URL, (err, res) => {
  if (err) throw err;
  console.log(res.statusCode);
  console.log(res.body);
})
