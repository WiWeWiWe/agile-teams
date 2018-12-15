var http = require('http');
var server = http.createServer(acceptVote);
server.listen(3000);

function acceptVote(request, response)
{
   response.write("Thank you for your vote!!");
   response.end;
}