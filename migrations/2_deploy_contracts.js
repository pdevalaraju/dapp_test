var Pupper_Deployer = artifacts.require("PupperCoinSaleDeployer");
var Pupper_Sale = artifacts.require("PupperCoinSale");
var Pupper_Token = artifacts.require("PupperCoin");

module.exports = function(deployer) {
  deployer.deploy(Pupper_Deployer, "PupperCoin", "PuP", '0x5DcB55E69997d60397e4C685cc695E82FA5d377B', 100, 200, 1);
		
	
};


