var express = require('express');
var app = express();

var {createLogger, format, transports} = require('winston');
var logger = createLogger({
   level:'debug',
   format: format.combine(
      format.colorize(),
      format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
   transports: [new transports.Console()]
});

const Joi = require('joi');

//validation schemaGiveFeedback for giving feedback
const schemaGiveFeedback = Joi.object().keys({
   userid: Joi.string().alphanum().min(8).max(8).required(),
   eventid: Joi.number().integer().required(),
   grade:Joi.number().integer().min(1).max(6).required(),
   text:Joi.string()
});


app.use(express.json());
var port = process.env.port || 3005;

//creating table of feedbacks
var feedbacks = [
   {id:1, userid:'z000cyal', eventid:1, grade: 4, text:'was quite ok'},
   {id:2, userid:'z000cyal', eventid:2, grade: 1, text:'perfect!'},
   {id:3, userid:'z000cyal', eventid:3, grade: 2, text:'super!'},
   {id:4, userid:'z000cyal', eventid:4, grade: 3, text:'ok'},
   {id:5, userid:'z000cyab', eventid:1, grade: 5, text:'boring'},
   {id:5, userid:'z000cyab', eventid:2, grade: 6, text:'bad'}
];

//get request to the root of the website
app.get('/',(request, response) => {
   response.send(feedbacks);
   logger.info('received request for root of website');
});

//receiving feedback
app.post('/api/feedback/', (req, res) =>{
   var feedback = {
      id:feedbacks.length + 1,
      userid: req.body.userid,
      eventid:req.body.eventid,
      grade:req.body.grade,
      text:req.body.text
   };

   logger.debug('received feedback:' 
   + JSON.stringify({
      ID: feedback.id, Userid: feedback.userid, Eventid: feedback.eventid, Grade: feedback.grade, Text: feedback.text}));

   //validate input
   const result = Joi.validate({
      userid:feedback.userid, 
      eventid:feedback.eventid,
      grade: feedback.grade,
      text: feedback.text}, schemaGiveFeedback);

   if (result.error === null)
   {
      //input correct --> push to feedback table
      feedbacks.push(feedback);
      res.send(feedback);
   }
   else
   {
      //input incorrect
      logger.error('Received faulty feedback from. Error: ' + result.error.message);
      logger.error('Feedback was: ' + JSON.stringify({
         ID: feedback.id, Userid: feedback.userid, Eventid: feedback.eventid, Grade: feedback.grade, Text: feedback.text}));
      res.send(result.error.message);
   }
   
})

app.listen(port,() => logger.info('Listening on port ' + port));