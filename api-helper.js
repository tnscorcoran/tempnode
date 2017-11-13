var request_helper = require('./request-helper');


module.exports = 
{
  
	getUserByLastName: function (req, res) 
	{    
		return getUserByLastName (req, res);
	},

	getUserById: function (req, res) 
	{    
		return getUserById (req, res);
	},

	getRoles: function (req, res) 
	{    
		return getRoles (req, res);
	},

	getPayByPhoneParkingEntitlements: function (req, res) 
	{    
		return getPayByPhoneParkingEntitlements (req, res);
	},

	getMyBroadbandFeatures: function (req, res) 
	{    
		return getMyBroadbandFeatures (req, res);
	},
	
	getMyBroadbandFeaturesDocs: function (req, res) 
	{    
		return getMyBroadbandFeaturesDocs (req, res);
	},
	
	getConstantContactsCollection: function (req, res) 
	{    
		return getConstantContactsCollection (req, res);
	},

	getDaimlerCarConfig: function (req, res) 
	{    
		return getDaimlerCarConfig (req, res);
	}
	
	
	
};

function getUserByLastName(req, res) {
	
	
	var lastname = request_helper.getRequestParam(req, 'lastname');
	
	var userData = {};
	
	userData["userId "] = "987654";	
	userData["firstname"] = "John";
	userData["lastname"] = lastname;

	userData["role"] = "Manager";

	res.send(userData);
}

function getUserById(req, res) {
	
	var userid = request_helper.getRequestParam(req, 'userId');

	var userData = {};
	
	userData["userId "] = userid;	
	userData["firstname"] = "John";
	userData["lastname"] = "Doe";
	userData["role"] = "Manager";

	
	res.send(userData);
}

function getRoles(req, res) {
	
	var roleData = ["Intern", "Employee", "Supervisor", "Manager", "Director", "Executive"];	
		
	res.send(JSON.stringify(roleData));
}

function getPayByPhoneParkingEntitlements(req, res) {
	//	/enforcement/parkingentitlements/?vendorId=12&regionid=72&plate=23&graceminutes=3&asatdate=2016-02-19T10:25:05-07:00Z&coordinates=48.861315,2.336760&accuracy=5&patrollerId=AB12789983
	
	var responseData = [];
	
	responseData["vendorId "] = request_helper.getRequestParam(req, 'vendorId');;
	responseData["regionid "] = request_helper.getRequestParam(req, 'regionid');;
	responseData["plate "] = request_helper.getRequestParam(req, 'plate');;
	responseData["graceminutes "] = request_helper.getRequestParam(req, 'graceminutes');;
	responseData["asatdate "] = request_helper.getRequestParam(req, 'asatdate');;
	responseData["coordinates "] = request_helper.getRequestParam(req, 'coordinates');;
	responseData["accuracy "] = request_helper.getRequestParam(req, 'accuracy');;
	responseData["patrollerId "] = request_helper.getRequestParam(req, 'patrollerId');;
		
	res.send(JSON.stringify(responseData));
}

function getMyBroadbandFeatures(req, res) {
	
	var featureData = ["High Availability", "High Speed", "Medium Bandwidth", "Premium Support", "Moderate Uptime", "Medium Cost", "High number of Packages"];	
		
	res.send(JSON.stringify(featureData));
}

function getMyBroadbandFeaturesDocs(req, res) {
	
	var rand = getRandomArbitrary(1,10);
	rand = parseInt(rand, 10);
	var allData = [];
	for(var i = 0; i < rand;i++){
		var featureData = ["High Availability", "High Speed", "Medium Bandwidth", "Premium Support", "Moderate Uptime", "Medium Cost", "High number of Packages"];	
		allData[allData.length] = featureData;	
	}
	
	res.setHeader('x-document-count', rand.toString());	
	res.send(JSON.stringify(allData, null, 2));
	
}





function getUserData(){

	var userData = {};
		
	userData["userId "] = "73229";	
	userData["firstname"] = "John";
	userData["lastname"] = "Doe";
	userData["role"] = "Manager";

	return userData;

}


function getConstantContactsCollection(req, res) {
	
	var responseData = {};
	
	responseData["email "] = request_helper.getRequestParam(req, 'email');
	responseData["limit "] = request_helper.getRequestParam(req, 'limit');
	responseData["modified_since "] = request_helper.getRequestParam(req, 'modified_since');
	responseData["status "] = request_helper.getRequestParam(req, 'status');
	var contacts = new Array(2);
	
	var contact1 = {};
	contact1["email"] = "someuser@3scale.net"
	contact1["cell"] = "347 123 4567"
	contacts[0]	= contact1;
		
	var contact2 = {};	
	contact2["email"] = "someotheruser@3scale.net"
	contact2["cell"] = "347 987 6543"
	contacts[1]	= contact2;

	responseData["contacts "] = contacts;

	res.send(JSON.stringify(responseData, 0, 4));
}



function getDaimlerCarConfig(req, res) {
	//	/enforcement/parkingentitlements/?vendorId=12&regionid=72&plate=23&graceminutes=3&asatdate=2016-02-19T10:25:05-07:00Z&coordinates=48.861315,2.336760&accuracy=5&patrollerId=AB12789983
	
	var responseData = {};
	
	responseData["width "] = request_helper.getRequestParam(req, 'width');;
	responseData["height "] = request_helper.getRequestParam(req, 'height');;
	responseData["enginesize "] = request_helper.getRequestParam(req, 'enginesize');;

		
	res.send(JSON.stringify(responseData));
}

//************************************************** PRIVATE MEMBERS **************************************************

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}