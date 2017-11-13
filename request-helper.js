var http = require('http');

module.exports = 
{
  
  getHeaderValue: function (request, name) 
  {
    var header = request.headers[name];
    return header;
  },

  getRequestParam: function (request, name) 
  {
    return request.param(name);
  }


};

var privateFunction = function () {

}