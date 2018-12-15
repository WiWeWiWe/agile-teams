var express = require('express');
var app = express();

app.use(express.json());

var port = process.env.port || 3000;

var feedbacks = [
   {id:1, userid:'z000cyal', eventid:1, grade: 4, text:'was quite ok'},
   {id:2, userid:'z000cyal', eventid:2, grade: 1, text:'perfect!'},
   {id:3, userid:'z000cyal', eventid:3, grade: 2, text:'super!'},
   {id:4, userid:'z000cyal', eventid:4, grade: 3, text:'ok'},
   {id:5, userid:'z000cyab', eventid:1, grade: 5, text:'boring'},
   {id:5, userid:'z000cyab', eventid:2, grade: 6, text:'bad'}
];

app.get('/',(request, response) => {
   response.send(feedbacks);
   console.log('done');
});

app.post('/api/feedback/', (req, res) =>{
   var feedback = {
      id:feedbacks.length + 1,
      userid: req.body.userid,
      eventid:req.body.eventid,
      grade:req.body.grade,
      text:req.body.text
   };

   feedbacks.push(feedback);
   res.send(feedback);
})

app.listen(port,() => console.log(`Listening on port ${port}...`));