
/**
 * Module dependencies.
 */

var express = require('express'),
    expressSession = require('express-session'),
    http = require('http'),
    https = require('https'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hat = require('hat'),
    url = require('url'),
    jwt = require('jsonwebtoken'); 

var app = express();

var api_helper = require('./api-helper.js');
var bizaar_voice = require('./clients/_01BazaarVoice/bazaar-voice.js');
var wolterskluwer = require('./clients/_02Wolterskluwer/wolterskluwer.js');
var uscis = require('./clients/_03USCIS/uscis.js');
var citco = require('./clients/_04Citco/citco.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

var options = {
  app: app
};
app.use(expressSession({
    secret:  "...",
    cookie: {maxAge: 604800000},
}));

// all environments
app.set('port', process.env.PORT || 3001);
app.use(logger('dev'));
app.use(bodyParser.json())

app.use(methodOverride());



//**************************************************************************************************************
//Utility Functions
function getXMLValue(xmlString, startElement, endElement){
	if(xmlString.indexOf(startElement)!=-1 && xmlString.indexOf(endElement)){
		var indexOfStartElement = xmlString.indexOf(startElement);
		var indexOfEndElement = xmlString.indexOf(endElement);
		return xmlString.substring(indexOfStartElement+startElement.length, indexOfEndElement);
	}
}


//**************************************************************************************************************
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/* GET login page. */
app.get('/login', function(req, res) {
	
	if(req.session.tok){
		delete req.session.tok;
	}
	if(req.session.callbackurl){
		delete req.session.callbackurl;
	}
	if(req.session.state){
		delete req.session.state;
	}
	if(req.session.scope){
		delete req.session.scope;
	}
	
	//req.session.callbackurl = 'http://ec2-54-77-112-30.eu-west-1.compute.amazonaws.com/callback';
	
	
	if(req.param('callbackurl')){
		req.session.callbackurl = req.param('callbackurl');
	}
	else{
		req.session.callbackurl = 'http://ec2-54-171-176-11.eu-west-1.compute.amazonaws.com/callback';
	}
	
	req.session.state = req.param('state');
	req.session.scope = req.param('scope');

		
	console.log('state='+req.session.state+',scope='+req.session.scope);
	console.log('**************************************************************callbackurl='+req.session.callbackurl);
	
	if (!req.session.state){
		var loginError = 'You need to supply a state query parameter'
		res.render('error', { title: 'Login Error', error: loginError });
	}
	else if (!req.session.scope){
		var loginError = 'You need to supply a scope query parameter'
		res.render('error', { title: 'Login Error', error: loginError });
	}
	else{
		res.render('login', { title: 'Login', loginError: '' });
	}
	
});


//*******************************************************
// POSTS - 3 Scale webhooks
//*******************************************************
app.post('/login', function(req, res) {
	var loginError = '';
	var email = req.param('email')
	var password = req.param('password')

	email = 'tom@3scale.net'
	password = 'foo123'
	console.log(email+'---'+password);
	
	var loginError = '';
	if(email!='tom@3scale.net' || password!='foo123'){
		res.render('login', { title: 'Login', loginError: 'Invalid Credentials' });
	}
	else{
		req.session.loggedin='true';
		res.render('consent', { title: 'Login', action: req.session.callbackurl, 
			state:req.session.state, scope:req.session.scope});
	}
	
});


//*******************************************************
//Client Specific URLs
//*******************************************************
//Movie Tickets
app.post('/token-movietickets', function(req, res) {
	var clientid = req.param('client_id');
	var clientsecret = req.param('client_secret');
	var grantType = req.param('grant_type');

	var expectedClientID = "d78c06b7";
	var expectedSecret = "683a4984449264a0fac55c23d61fc38a";
	var expectedGrantType = "code";
	
	if(clientid!=expectedClientID 
		|| clientsecret!=expectedSecret 
		|| grantType!=expectedGrantType 
		){
			res.status(403).send("Forbidden");
	}
	else{
		var token = hat();
		res.status(200).json({ access_token: token }); 		
	}
	
});

//*******************************************************
//Trucode
app.post('/sts/oauth2/token', function(req, res) {
	///console.log("---------------/sts/oauth2/token");

	var clientid = req.param('client_id');
	var clientsecret = req.param('client_secret');
	var grantType = req.param('grant_type');

	var expectedClientID = "916a7afa";
	var expectedSecret = "9f50f7c19cf1a6e9e4c113a05e9b358d";
	var expectedGrantType = "client_credentials";
	
	//console.log(clientid+'---------------'+clientsecret+'---------------'+grantType);
	
	if(clientid!=expectedClientID 
		|| clientsecret!=expectedSecret 
		|| grantType!=expectedGrantType 
		){
			res.status(403).send("Forbidden");
	}
	else{
		var token = hat();
		res.json({ access_token: token, expires_in: 43200, token_type: "Bearer" }).status(200); 		
	}
	
});




//**************************************************************************************************************
//Userzoom
/* GET login page. */
app.get('/userzoom-login', function(req, res) {
	
	res.render('loginz-userzoom', { title: 'Login', loginError: '' });
	
	
});


//*******************************************************
app.post('/userzoom-login', function(req, res) {
	var loginError = '';
	var email = req.param('email')
	var password = req.param('password')
	
	var loginError = '';
	if(email!='user@userzoom.com' || password!='foo123'){
		res.render('loginz-userzoom', { title: 'Login', loginError: 'Invalid Credentials' });
	}
	else{
				
		var post_data = "provider_key=1997e559f07d4eac2c71210284bf3764&username=tom@3scale.net&expires_in=60";
		  
		var userzoom3scaleHost = "userzoom-poc-admin.3scale.net"
			  
		var ssoEndpoint = "/admin/api/sso_tokens.xml"
				  
		var options = {
			host: userzoom3scaleHost,
			path: ssoEndpoint,
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(post_data)
			}		        
		};

		
	    var post_req = https.request(options, function(res2) {
	        res2.setEncoding('utf-8');
	        var responseString = '';

	        res2.on('data', function(data) {
	          responseString += data;
	        });
	        res2.on('end', function() {
	        	//console.log("\nAPI CALL, responseString: "+responseString);	        	
	        	var redirect = getXMLValue(responseString, "<sso_url>", "</sso_url>")
	        	//console.log("\nAPI CALL, redirect: "+redirect);	        	
	    		res.statusCode = 302;
	    		res.setHeader('Location', redirect);
	    		res.end();
	        });
	        res2.on('error', function (e) {
	        	console.log("*************** REST HTTP CALL ERROR *****************\n"+e);
	        	res.status(500).json({ "STATUS": "ERROR" }); 		
	        });

	    });
	    
	    post_req.write(post_data);
	    post_req.end();
	}
	
});



//**************************************************************************************************************
//Putnam
	//------------------------------------- APIs ---------------------------------------------------------------
			 
app.get('/roleadmin/rs/userservice/search/:lastname', function(req, res) {
	api_helper.getUserByLastName(req, res);		
});

app.get('/roleadmin/rs/userservice/user/:userId', function(req, res) {
	api_helper.getUserById(req, res);		
});

app.get('/roleadmin/rs/roleservice/roles', function(req, res) {
	api_helper.getRoles(req, res);		
});
	




//**************************************************************************************************************
//Bla Bla
	//------------------------------------- Random for API Monitoring ---------------------------------------------------------------


app.get('/datadog/monitored/roles/endpoint', function(req, res) {
	api_helper.getRoles(req, res);		
});
	
app.get('/datadog/monitored/userservice/search/:lastname', function(req, res) {
	api_helper.getUserByLastName(req, res);		
});

app.get('/datadog/monitored/userservice/user/:userId', function(req, res) {
	//api_helper.getUserById(req, res);
	res.status(200).json({ "STATUS": "GOOD" });
	//res.status(500).json({ "STATUS": "ERROR" });
	
});

//**************************************************************************************************************
//Vinay request in Slack 160420
app.get('/vinay-json', function(req, res) {
	
	res.status(200).json({
		"Valid": true,
		"Info": "IDX10214: Audience validation failed. Audiences: 'http://localhost:1337/'. Did not match:  validationParameters.ValidAudience: 'null' or validationParameters.ValidAudiences: 'https://www.servsmart.servicemaster.com, http://mem0bscweb01d:60/, http://localhost:1337'"
		});
	
	
});

//**************************************************************************************************************
//Enterprise Demo - My Broadband Features
app.get('/my-broadband-features', function(req, res) {
	api_helper.getMyBroadbandFeatures(req, res);		
});

app.get('/broadband/features', function(req, res) {
	api_helper.getMyBroadbandFeatures(req, res);		
});

app.get('/broadband/features/docs', function(req, res) {
	api_helper.getMyBroadbandFeaturesDocs(req, res);		
});

//**************************************************************************************************************
//Pay By Phone

app.get('/enforcement/parkingentitlements', function(req, res) {
	api_helper.getPayByPhoneParkingEntitlements(req, res);		
});
	
app.post('/enforcement/parkingentitlements', function(req, res) {
	  console.log(req.body);     
	  res.send(req.body); 
});


//**************************************************************************************************************
//Constant Contact

app.get('/v2/contacts', function(req, res) {
	api_helper.getConstantContactsCollection(req, res);		
});



//**************************************************************************************************************
//Bazaar Voice
app.get('/data/reviews.json', function(req, res) {
	bizaar_voice.get_data_reviews(req, res);		
});

app.get('/curations/content/get', function(req, res) {
	bizaar_voice.get_curations_content(req, res);		
});

//**************************************************************************************************************
//Daimler

app.get('/carconfig', function(req, res) {
	api_helper.getDaimlerCarConfig(req, res);		
});
	
app.post('/carconfig', function(req, res) {
	  console.log(req.body);     
	  res.send(req.body); 
});


//**************************************************************************************************************
//CATHAY - demonstrating 3 services. See also, BasicRest Java Project (BP /camel endpoints and SMS endpoints). 			 
app.get('/hr/userservice/search/:lastname', function(req, res) {
	api_helper.getUserByLastName(req, res);		
});

app.get('/hr/userservice/user/:userId', function(req, res) {
	api_helper.getUserById(req, res);		
});

app.get('/hr/roleservice/roles', function(req, res) {
	api_helper.getRoles(req, res);		
});
app.get('/broadband/my-broadband-features', function(req, res) {
	api_helper.getMyBroadbandFeatures(req, res);		
});

//**************************************************************************************************************
//WOLTERSKLUWER
app.post('/Identity.svc/Authentication_Authenticate', function(req, res) {
	wolterskluwer.auth(req, res);		
});

app.post('/Identity.svc/Session_CreateSession', function(req, res) {
	wolterskluwer.token(req, res);		
});

app.post('/Research.svc/Search_ExecuteSearch', function(req, res) {
	wolterskluwer.search(req, res);		
});



//**************************************************************************************************************
//uscis public sector
app.post('/mock-auth-service', function(req, res) {
	uscis.postAuthService(req, res);		
});

app.get('/mock-auth-service', function(req, res) {
	uscis.getAuthService(req, res);		
});




//**************************************************************************************************************
//Citco 
//2 IDENTICAL ENDPOINTS in 2 Services
//http://CHA1NB10475.ad.ent.citco.com:8185/ARTMonitor/ARTBrokerInfo/
//http://brn0vmlxappdev29:8185/ARTMonitor/ARTBrokerInfo/
//<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:brok="http://schemas.citco.com/Broker">
//   <soap:Header/>
//   <soap:Body>
//      <brok:retrieveAllClientBrokerInfo>
//         <!--Optional:-->
//         <brok:ClientId>?</brok:ClientId>
//         <!--Optional:-->
//         <brok:FundId>?</brok:FundId>
//      </brok:retrieveAllClientBrokerInfo>
//   </soap:Body>
//</soap:Envelope>
//-----------
app.get('/ARTMonitor/ARTBrokerInfo', function(req, res) {
	citco.getBrokerInfo(req, res);		
});



//http://brn0vmlxappdev29:8185/ARTBrokerInfo/v1/
//<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:brok="http://schemas.citco.com/Broker">
//   <soap:Header/>
//  <soap:Body>
//   <brok:retrieveAllClientBrokerInfo>
//        
//      </brok:retrieveAllClientBrokerInfo>
//   </soap:Body>
//</soap:Envelope>
//-----------
app.get('/ARTBrokerInfo/v1', function(req, res) {
	citco.getBrokerInfo(req, res);		
});


//http://brn0vmlxappdev29:6203/CurrencyConverter/v1
//<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cur="http://schemas.citco.com/CurrencyConverterData">
//   <soap:Header/>
//   <soap:Body>
//      <cur:convertCurrencyRequest>
//         <cur:FromCurrency>USD</cur:FromCurrency>
//         <cur:ToCurrency>GBP</cur:ToCurrency>
//         <cur:FxDate>2017-06-01</cur:FxDate>
//      </cur:convertCurrencyRequest>
//   </soap:Body>
//</soap:Envelope>
//-----------
app.post('/CurrencyConverter/v1', function(req, res) {
	citco.doCurrencyConversion(req, res);		
});

app.get('/currency/converter', function(req, res) {
	citco.doCurrencyConversion(req, res);
});

app.get('/broker/info', function(req, res) {
	citco.getBrokerInfo(req, res);
});


app.get('/jwtstuff', function(req, res) {

	//var key = "-----BEGIN PUBLIC KEY-----onVUtTL4CZ8WJQ9tO3Ka_qvCak-CONmZYQjHwpsQrLnGpTIZHf9YU0gN0tWKp_M_gDnuQH7bCDvJn0w442s2ZV9tJ0xRxyVrrW5AV4Yte7FkDW5zzHZZRuLEipDS_VamG0ztXV4jAc-YaBqmFHIhldZ_gdItjbZ3sEg5QHx4bHbmFZ9Yko60XAvtgo5dLeJ4B2hMCHGWoQvkjNu1AMWVwn84YLnOBS8pE2tVFRpsbczyekx6yV2M2PgF4wFbXTusFbs9i5sT1ceID-pPsFDFRGvX_vJresKSTj7zA6O7HfnoffONHOMuz-C6SEgA3OgdfgDdeziz_W3f9MF6qOcV5w-----END PUBLIC KEY-----";
	//var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJlNTE2YjU0NjFjZjM3NDc1NDA2MTMyNDM3MWNkZGNiNDAxNDBjYWIifQ.eyJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI5NDYwMjMzMjY2MjQ2MjA2OTUiLCJoZCI6InJlZGhhdC5jb20iLCJlbWFpbCI6InRjb3Jjb3JhQHJlZGhhdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ii1IeXdEVnRMUl82UEYzYmloemtBZWciLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE0OTk3NTI3NjcsImV4cCI6MTQ5OTc1NjM2N30.ERE5Q8kWVtBu1bLy7RSnIhM1s6dEPXx06WuJefbBOpFELRn1L3Le2__JnNLWdZWdbK-v9Aj3zOKnAh-BNrulOMllM4xUGDXI7xt1mDuTXt9AMnH9js56m8_X8LgeX6DVUJne0_8Ef0knFTEPijgXnYvatZbozirKPqXNWGpqU6kvxHXwg9awwAkEIHu80y7qxnuDmTJgG8Dle6-gX4fmE772V0iVadMHh7T5vN2NT1-1FrMELUNMMBYt0c-cauShf_j0AUUBnZkR41ap387eDo4hFkQdWAEPd02IwXSPruytIkigpgvDTqizZvh5Rvvwk5Pl4PhnGc_wv4H63EqMCg";

	//var key = "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhNvUEv2v/cuyKd3r26ojR6DAWdsFXeOMFL2FwQ+hFjqOGrSlKflxCorXwUvIl9kFZqpQYvDv/KF6NUiNnFLyaIhQGa6H/x3RJ28gBMnyWtqZVXKUiLE0o4NWE9/dsrokfIEmuJTQFm+w7fGmmLr8kwxsFcbxCDm0WL0ZwEwDnvRbyEBzd0oF2QqljiPyak6VOD/kpcL7U0PUkqb0Tdk+9Dzg2S/LkY8fTtxZJ8C8MEaLB7uWmPMqDyoPFYb3cS0QlRZiZlGG7tmaumh554yC3nhhNS9Ww7uNkpDAHM3dMzX7CoPXVUX4rJVSWkc1gycPJkdjv4t3qUhIkwXrLGVmSQIDAQAB-----END PUBLIC KEY-----";	
	//var token = "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIwNWRlYTU3YS0zYzZmLTRjMmItYjM5Mi0wMGQyOGY0NzIxZWQiLCJleHAiOjE1MDA4Mzg5OTIsIm5iZiI6MCwiaWF0IjoxNDk5NzU4OTkyLCJpc3MiOiJodHRwOi8vcmgtc3NvLm1heW9yb3ZhLm1lOjgwODAvYXV0aC9yZWFsbXMvaWQtcG9jIiwiYXVkIjoiM3NjYWxlLW9hdXRoLWNsaWVudCIsInN1YiI6IjhlZGEwMTcxLWQzOTEtNDk0YS05NWUzLTNjODJiNzFiZWFkOCIsInR5cCI6IkJlYXJlciIsImF6cCI6IjNzY2FsZS1vYXV0aC1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiZTg3NmQ2MzQtOGViZS00YjBlLWI4NDAtNTIzZDczOWZlODE5IiwiY2xpZW50X3Nlc3Npb24iOiI4NmIxMGJiZC0wYjhkLTQ2YmMtYWE0Yy1lMjQ3ZjE2Y2E3OGYiLCJhbGxvd2VkLW9yaWdpbnMiOlsiIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyIvY2FtZWwiXX0sInJlc291cmNlX2FjY2VzcyI6e30sIm5hbWUiOiJDYWwgQ2xpZW50IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2FsLWNsaWVudCIsImdpdmVuX25hbWUiOiJDYWwiLCJmYW1pbHlfbmFtZSI6IkNsaWVudCIsImVtYWlsIjoiY2FsLWNsaWVudEBnbWFpbC5jb20ifQ.U4d895sgPKhKjb8YqqVfxa4odF_FRDr-uPq68vr-rkb3MCKDcNDOflSO0BwPiT1n3xedzxy0XsD4X0O0FqynmZkB6TVvIhBS9P5qRZlwEwCokJl4DnJV2BQv4O9RsQN4vGDxfZyEriMgdiV6MxRC4RCaPnROSodaeBId00YKATUTRuCI4xSb0180XGt8yaHeNczwnZlpWlcFC1INN1g0MxMgM6dWaN9ZGTLD0Npa8oCxCQfINgS4y93QIstapkea5xHPWWU9sWwhFElTPwk_Qd_9hLrhz5MGW4cWmepfkZp9H-95tXMdutypUDfLrwnv3B_HeK7ymQPe1kCWRt_flA";
	
	//var key = "-----BEGIN PUBLIC KEY----- -----END PUBLIC KEY-----";	
	var key = "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAki3Dyds/PLR1knH3y6CQO39eSiB9lwCeIaO3v2A1NiqcyaV+RS9vKrfKWX1EnhBnfeeVbO9WqPSiGmYq99hJTvQu2WIsNbq4zBVPMLeXvKJljyYpbqoT5+WsOM5wLg4xSm7mVDKmbJKwBOIQ/sQb1QXzE+h28LVTLp3gE5/5/D7pGayXL/mpDZUl7gydJy/3bfcTe0Hoys0VODPW04lbmiYeJQELREXsio0ObGWGvm958ob8C/i8UFSHMJ2XTK+0DzkbNobg0uv1qE2bRPncRKyRQNPN0l97EtCMvSDNvMwG2oEizRdJc2BJZ4yp4GlfooOCr91vDzHXPZrkhFvZsQIDAQAB-----END PUBLIC KEY-----";	
	var token = "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI5NjVjODdhNy0zZWUyLTRiMGYtOTg1NC1iM2E0YWE2OTE1N2IiLCJleHAiOjE1MDc3NzA4NjcsIm5iZiI6MCwiaWF0IjoxNTAzNDUwODY3LCJpc3MiOiJodHRwOi8vcmgtc3NvLm1heW9yb3ZhLm1lOjgwODAvYXV0aC9yZWFsbXMvSUFHIiwiYXVkIjoiNjQzOTVmNTciLCJzdWIiOiIwNzNkNGRiMy0zM2IwLTQyZmEtOTI1OS1lMDFhNzQ4YmI3YTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI2NDM5NWY1NyIsInNlc3Npb25fc3RhdGUiOiI0NDkyNzVjYy0zMTZiLTQxNjktODM3ZS1lN2Q1YmE2NWJkMGMiLCJjbGllbnRfc2Vzc2lvbiI6IjgzM2IyODg2LTAwMDMtNDM5Yy04ODg0LWNiODQ2MTQxOGY2OCIsImFsbG93ZWQtb3JpZ2lucyI6WyIiXSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LXByb2ZpbGUiXX19LCJjbGllbnRJZCI6IjY0Mzk1ZjU3IiwiY2xpZW50SG9zdCI6IjE2Mi4xNTguMTc4LjE5MyIsIm5hbWUiOiIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtNjQzOTVmNTciLCJjbGllbnRBZGRyZXNzIjoiMTYyLjE1OC4xNzguMTkzIiwiZW1haWwiOiJzZXJ2aWNlLWFjY291bnQtNjQzOTVmNTdAcGxhY2Vob2xkZXIub3JnIn0.Sput538QWkRmCci6LZGclW3B6HV8OBFdIp7dPpqBhhhcm7nczLTQZaqx_9Ld7O5gkq8UDZ-f_6h9jEadAtLU1rh9mlDyNnyYGFUk0nhucCCMHpyOKGRCq6KAKFur3Fp7Kqg2SQS3xMV2g6pvSfC01vh0mByDVDM-znd3MCwXPMZKvi2EblaJhtwiy6YC_Fh-Hx_XhM4pDOmDJikIbvwuNxIKtnqlPfEV69jjQlOkCwJwGqwjjdKUuad6_vVcIKsQ1HghRLbL6ojZxWvz5alBJFVjh6hPMWltk7g9jUmgETlkOdLQJr68G1Brt8NHqQldghCFUXh4xGS7k1Qk7MJp3g";
	
	

    jwt.verify(token, key, { algorithms: ['RS256'] }, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });		
	
	
});

