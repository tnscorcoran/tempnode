var rn = require('random-number');

module.exports = 
{
  
	doCurrencyConversion: function (req, res) 
	{    
		return doCurrencyConversion (req, res);
	},
	getBrokerInfo: function (req, res) 
	{    
		return getBrokerInfo (req, res);
	}
	
};	



function doCurrencyConversion(req, res) {
	
	var responseData = {};
	
	responseData["FromCurrency "] = "USD";
	responseData["ToCurrency "] = "GBP";
	responseData["FxDate "] = "01/01/2017";
	responseData["Rate "] = "0.78";

		
	res.send(JSON.stringify(responseData));
}
	

function getBrokerInfo(req, res) {
	
	var responseData = {};
	
	
	var brokerData1 = {};
	brokerData1["Name "] = "Brokers Inc";
	brokerData1["Address "] = "1 Wall St, New York";
	brokerData1["Trade In"] = "Stocks, Bonds";
	
	var brokerData2 = {};
	brokerData2["Name "] = "Financiers Inc";
	brokerData2["Address "] = "1 World Trade Center St, New York";
	brokerData2["Trade In"] = "Bonds, Options";
	
	var brokersData = {brokerData1, brokerData2 };
	responseData["Brokers "] = brokersData;

		
	res.send(JSON.stringify(responseData));
}
	


