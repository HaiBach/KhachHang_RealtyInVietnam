const fs = require('fs')

module.exports = {
  images: {
    domains: ['realtyinvietnam2.test'],
  },
  env: {
    // apiRoute: 'http://realtyinvietnam2.test:8888/wp-json'
    apiRoute: 'https://realtyinvietnam.com/',

    // Script
    jquery: fs.readFileSync('./public/js/jquery-1.12.4.js').toString(),
    ruby01: fs.readFileSync('./public/js/ruby01.js').toString(),
    rubyslider: fs.readFileSync('./public/js/rubyslider.js').toString()
  }
}