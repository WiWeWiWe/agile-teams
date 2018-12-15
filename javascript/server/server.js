var express = require('express');
var app = express();

var port = process.env.port || 3000;

app.get('/',(request, response) => {
   response.send("Thanks for your vote. This is provided by express!");
   console.log('done');
});


app.listen(port,() => console.log(`Listening on port ${port}...`));