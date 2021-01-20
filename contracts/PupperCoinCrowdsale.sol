pragma solidity ^0.5.0;

import "./PupperCoin.sol";
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";

// @TODO: Inherit the crowdsale contracts
contract PupperCoinSale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale, RefundableCrowdsale {
    
    constructor(
        //capture the constructor parameters passed by the deployer!
        
        string memory name,
        string memory symbol,
        address payable wallet, // sale beneficiary 
        uint goal, // fundraising goal
        uint cap, // max fundraising amount
        uint rate, // rate in TKNbits
        uint opening_time,
        uint closing_time,
        
        PupperCoin token // the PepperCoin contract itself that the PepperCoinSale will work with

    )
        // Pass the constructor parameters to the crowdsale contracts.
        
        Crowdsale(rate, wallet, token)
        CappedCrowdsale(cap)
        TimedCrowdsale(opening_time, closing_time)
        RefundableCrowdsale(goal)
        
         public {
        // Empty constructor for inherted modules
         }
         
        
}

contract PupperCoinSaleDeployer {

    address public token_sale_address;
    address public token_address;

    constructor(
        // loading the constructor parameters!
        
        string memory name,
        string memory symbol,
        address payable wallet, // this address will receive all Ether raised by the sale
        uint goal, // fundraising goal or minimum ether to be raised otherwise, refund the collected funds.
        uint cap, // max amount of ethers to be raised
        uint rate // rate in TKNbits
        
        // block_timestamp "now" will be passed as opening_time directly in the function call instead of creating a variable
        //closing time is also passed via now + the duration. in this case we made the duration 1 hour for testing purposes
        

    )
        public
    {
        
       //Instantiating the PupperCoin contract and catpuring its address
        
        PupperCoin token = new PupperCoin(name, symbol, 0);
        token_address = address(token);

        // instantiating PupperCoinSale contract and passing the contract intitating parameteres vis-a-vis..
        //the token, goal, open and close times in the form of  now and now + 1 hour and the token instannce.
     
        
        PupperCoinSale pupper_sale = new PupperCoinSale(name, symbol, wallet, goal, cap, rate, now, now + 48 hours, token);
        token_sale_address = address(pupper_sale);


        // make the PupperCoinSale contract a minter, then have the PupperCoinSaleDeployer renounce its minter role
        token.addMinter(token_sale_address);
        token.renounceMinter();
        
        }   
    }
