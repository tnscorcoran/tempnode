cd /Users/tomcorcoran/Desktop/_tc/work/Other/_old/17zMyIDP/zMyIDP
   


***************************

sudo npm install
node tc-idp.js


***************************
TEST URL
http://localhost:3001/login?tok=one&scope=read&state=mystate
https://tc-idp.herokuapp.com/login?tok=one&scope=read&state=mystate

	
				http://localhost:3001/login?callbackurl=http://ec2-52-16-122-197.eu-west-1.compute.amazonaws.com/callback&scope=read&state=mystate
				
				https://tc-idp.herokuapp.com/login?scope=read&state=mystate
				
				<to test, change method to POST>
				https://tc-idp.herokuapp.com/token-movietickets?client_id=d78c06b7&client_secret=683a4984449264a0fac55c23d61fc38a&grant_type=code
				
				Trucode
				go to API-10 in POSTMAN and look up POST Token Trucode
				https://tc-idp.herokuapp.com/sts/oauth2/token?client_id=916a7afa&client_secret=9f50f7c19cf1a6e9e4c113a05e9b358d&grant_type=code

curl -X POST http://localhost:3001/sts/oauth2/token?client_id=916a7afa&client_secret=9f50f7c19cf1a6e9e4c113a05e9b358d&grant_type=code
				
				Userzoom
				********
				 	- generic Nginx using this IDP (/Users/tomcorcoran/Desktop/_tc/work/Clients/clientPOCs/18_Userzoom/nginx)
					http://localhost:3001/login?callbackurl=http://ec2-54-175-208-236.compute-1.amazonaws.com/callbackurl
					https://tc-idp.herokuapp.com/login?callbackurl=http://ec2-54-175-208-236.compute-1.amazonaws.com/callbackurl
					- SSO
						http://localhost:3001/userzoom-login
						https://tc-idp.herokuapp.com/userzoom-login
				
				Putnam
				******
					http://localhost:3001/roleadmin/rs/userservice/search/Corcoran
					http://localhost:3001/roleadmin/rs/userservice/user/123456
					http://localhost:3001/roleadmin/rs/roleservice/roles
					
					https://tc-idp.herokuapp.com/roleadmin/rs/userservice/search/Corcoran
					https://tc-idp.herokuapp.com/roleadmin/rs/userservice/user/123456
					https://tc-idp.herokuapp.com/roleadmin/rs/roleservice/roles
					
					https://www.putnam.com/img/logo.png
					
					curl -X POST -HContent-type:application/json -HAccept:application/json --data '[{"uid":"jfitzpatrick","firstName":"Jeff","lastName":"Fitzpatrick"},{"uid":"rcannata","firstName":"Rob","lastName":"Cannata"},{"uid":"ssabbella","firstName":"Syam","lastName":"Sabbella"}]' http://localhost:3001/roleadmin/rs/roleservice/roles/xfi.xfi.user/users/?user_key=15e6f188cf74057fcba324afd997e9a0
					
				Bla Bla
				******
					http://tc-idp.herokuapp.com/datadog/monitored/userservice/search/Corcoran
					http://tc-idp.herokuapp.com/datadog/monitored/userservice/user/123456
					http://tc-idp.herokuapp.com/datadog/monitored/roles/endpoint
					
				Vinay
				******
				http://tc-idp.herokuapp.com/vinay-json
				
				
				
				
				Pay by phone
				******
				Local
				curl -X POST -HContent-type:application/json -HAccept:application/json http://localhost:3001/enforcement/parkingentitlements --data 				'{"parkingSessionId": "12345", "vehiclePlate": "ABC 123", "vehicleCountry": "US", "vehicleState": "NY", "moreFields": "wouldFollow...."}'
				http://localhost:3001/enforcement/parkingentitlements?
				vendorId=12&regionid=72&plate=23&graceminutes=3&asatdate=2016-02-19T10:25:05-07:00Z&coordinates=48.861315,2.336760&accuracy=5&patrollerId=AB12789983
				
				Heroku
				curl -X POST -HContent-type:application/json -HAccept:application/json http://tc-idp.herokuapp.com/enforcement/parkingentitlements --data 
				'{"parkingSessionId": "12345", "vehiclePlate": "ABC 123", "vehicleCountry": "US", "vehicleState": "NY", "moreFields": "wouldFollow...."}'
				
				http://tc-idp.herokuapp.com/enforcement/parkingentitlements?
				vendorId=12&regionid=72&plate=23&graceminutes=3&asatdate=2016-02-19T10:25:05-07:00Z&coordinates=48.861315,2.336760&accuracy=5&patrollerId=AB12789983
				
				ENTERPRISE DEMO - BROADBAND FOR OAUTH
				---------------
				http://localhost:3001/my-broadband-features
				http://tc-idp.herokuapp.com/my-broadband-features
				http://tc-idp.herokuapp.com/broadband/features
				
				Returns a random number of 'docs' - i.e. the same list a random x times in the JSON (1<=x<=11)
				Also, sets response header x-document-count = x
				http://localhost:3001/broadband/features/docs
				http://tc-idp.herokuapp.com/broadband/features/docs
				
				
				Constant Contact
				******
				Local
					http://localhost:3001/v2/contacts?email=tom@3scale.net&limit=10&modified_since=2012-09-27&status=ACTIVE
				Heroku
					http://tc-idp.herokuapp.com/v2/contacts?email=tom@3scale.net&limit=10&modified_since=2012-09-27&status=ACTIVE
				
				
				Bazaar Voice			
				******
				Local
					http://localhost:3001/data/reviews.json?apiversion=5.4&passkey=kuy3zj9pr3n7i0wxajrzj04xo&callback=JSONPHandler
					http://localhost:3001/curations/content/get?client=bazaarvoice&passkey=r538c65d7d3rsx2265tvzfje&limit=5&groups=test-group
				Heroku
					http://tc-idp.herokuapp.com/data/reviews.json?apiversion=5.4&passkey=kuy3zj9pr3n7i0wxajrzj04xo&callback=JSONPHandler
					http://tc-idp.herokuapp.com/curations/content/get?client=bazaarvoice&passkey=r538c65d7d3rsx2265tvzfje&limit=5&groups=test-group
				
				Daimler			
				******
								Local
									curl -X POST -HContent-type:application/json -HAccept:application/json http://localhost:3001/carconfig --data '{"width":"2000","height ":"1500","enginesize ":"2000"}'
				
									http://localhost:3001/carconfig?width=2000&height=1500&enginesize=2000
									
				
								Heroku
									
									curl -X POST -HContent-type:application/json -HAccept:application/json http://tc-idp.herokuapp.com/carconfig --data '{"width":"2000","height ":"1500","enginesize ":"2000"}'
				
									http://tc-idp.herokuapp.com/carconfig?width=2000&height=1500&enginesize=2000
					
				
				CATHAY			
				******
				HR
					http://tc-idp.herokuapp.com/hr/userservice/search/corcoran
					http://tc-idp.herokuapp.com/hr/userservice/user/123456
					http://tc-idp.herokuapp.com/hr/roleservice/roles
				BROADBAND
					http://tc-idp.herokuapp.com/broadband/my-broadband-features
					
					
				WOLTERSKLUWER
					curl -X POST -HContent-type:application/json -HAccept:application/json http://localhost:3001/Identity.svc/Authentication_Authenticate
					curl -X POST -HContent-type:application/json -HAccept:application/json http://localhost:3001/Identity.svc/Session_CreateSession
					curl -X POST -HContent-type:application/json -HAccept:application/json http://localhost:3001/Research.svc/Search_ExecuteSearch
				
					------------
					curl -X POST -HContent-type:application/json -HAccept:application/json http://tc-idp.herokuapp.com/Identity.svc/Authentication_Authenticate
					curl -X POST -HContent-type:application/json -HAccept:application/json http://tc-idp.herokuapp.com/Identity.svc/Session_CreateSession
					curl -X POST -HContent-type:application/json -HAccept:application/json http://tc-idp.herokuapp.com/Research.svc/Search_ExecuteSearch
				uscis
					curl -X POST http://localhost:3001/mock-auth-service
					curl -X POST http://tc-idp.herokuapp.com/mock-auth-service
					
				citco
					curl -X GET http://localhost:3001/ARTMonitor/ARTBrokerInfo
					curl -X GET http://localhost:3001/ARTBrokerInfo/v1
					curl -X GET http://localhost:3001/currencyConverter
					curl -X POST http://localhost:3001/CurrencyConverter/v1 --data'{"FromCurrency ":"USD","ToCurrency ":"GBP","FxDate ":"01/01/2017"}'
					
					curl -X GET http://tc-idp.herokuapp.com/ARTMonitor/ARTBrokerInfo
					curl -X GET http://tc-idp.herokuapp.com/ARTBrokerInfo/v1
					curl -X GET http://tc-idp.herokuapp.com/currencyConverter
					curl -X POST  -HContent-type:application/json -HAccept:application/json http://tc-idp.herokuapp.com/CurrencyConverter/v1 --data '{"FromCurrency ":"USD","ToCurrency ":"GBP","FxDate ":"01/01/2017"}'
					
					
					http://tc-idp.herokuapp.com/hr/roleservice/roles
					http://tc-idp.herokuapp.com/currency/converter
					http://tc-idp.herokuapp.com/broker/info
					
					
					http://localhost:3001/jwtstuff

					
***************************
HEROKU
	SETUP
		heroku login	(tncorcoran@yahoo.com, B....1)
		git init
		git add --all
		git commit -m "Committed"
		heroku create tc-idp		(https://tc-idp.herokuapp.com/)
		git push heroku master
	***************************
	Changes
		git add --all
		git commit -m "Committed"
		git push heroku master
	Logs
		heroku logs --tail	
		
***************************

for reference
	*******	cd /Users/tomcorcoran/Desktop/_tc/work/Other/_old/009_GSMA_ON_HEROKU/gsma-sandbox

		