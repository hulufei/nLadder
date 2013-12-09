var http = require('http')
  , url = require('url')
  , fs = require('fs');

var messages = ['testing'];
var clients = [];

http.createServer(function(req, res) {
  // Parse URL
  var url_parts = url.parse(req.url);
  console.log(url_parts);
  if (url_parts.pathname == '/') {
    fs.readFile('./index.html', function(err, data) {
      res.end(data);
    });
  }
  else if (url_parts.pathname.substr(0, 5) == '/poll') {
    // Implementing long-polling on the server side
    var count = url_parts.pathname.replace(/[^0-9]*/, '');
    console.log(count);
    if (messages.length > count) {
      res.end(JSON.stringify({
        count: messages.length,
        append: messages.slice(count).join('\n') + '\n'
      }));
    }
    else {
      clients.push(res);
    }
  }
  else if (url_parts.pathname.substr(0, 5) == '/msg/') {
    // Implementing message receiving and broadcasting on the server side
    var msg = unescape(url_parts.pathname.substr(5));
    messages.push(msg);
    while (clients.length > 0) {
      var client = clients.pop();
      client.end(JSON.stringify({
        count: messages.length,
        append: msg + '\n'
      }));
    }
    res.end();
  }
}).listen(8080, 'localhost');

console.log('server listening on 8080.');