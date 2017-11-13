var rn = require('random-number');

module.exports = 
{
  
	postAuthService: function (req, res) 
	{    
		return authService (req, res);
	},
	getAuthService: function (req, res) 
	{    
		return authService (req, res);
	}
	
};	


function authService(req, res) {
	var authorized = "true"
	
	var rn = require('random-number');
		var options = {
		  min:  1
		, max:  10
		, integer: true
		}
	var num = rn(options)
	console.log("num is "+num)
	if(num >7){
		authorized = "false"
	}
	
	
	var obj = {"authorized":authorized,"aud":"64395f57"};

	res.send(JSON.stringify(obj));
	
}

