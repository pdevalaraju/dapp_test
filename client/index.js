import Web3 from 'web3';
import PupperDeployer from './src/contracts/PupperCoinSaleDeployer.json';
import PupperSale from './src/contracts/PupperCoinSale.json';
import PupperCoin from './src/contracts/PupperCoin.json';

let web3;
let pupdeployer;
let pupsale;
let pupcoin;
let contract_methods =[];
let token_methods=[];
let contracts;
let pupsale_address = '0xF7cD707288584fFBBBc0504a5b0883e05ae8147D';
let pup_address = '0xD7780F342d4Ff46556E83F8dcCfA7a35b48C0605'

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
      const deploymentKey = Object.keys(PupperDeployer.networks);
      pupdeployer = new web3.eth.Contract(
        PupperDeployer.abi, 
        PupperDeployer
        .networks[deploymentKey]
        .address
        );
        
        pupdeployer.methods.token_sale_address().call()
        .then(function (result) {
          pupsale_address = result;
          console.log(result);});
        pupdeployer.methods.token_address().call()
        .then(function (result) {
          pup_address=result;
          console.log(result);});
        return  [new web3.eth.Contract(PupperSale.abi, pupsale_address),
        new web3.eth.Contract(PupperCoin.abi, pup_address)];
     // return new web3.eth.Contract(PupperSale.abi, pupsale_address);
      };



const initApp = () => {
 
  //token sale contract form variables
  const $buyTokens = document.getElementById("buyTokens");
  const $buyTokensResult= document.getElementById("buyTokensResult");
  const $cap = document.getElementById("cap");
  const $capResult = document.getElementById("capResult");
  const $capReached = document.getElementById("capReached");
  const $capReachedResult= document.getElementById("capReachedResult");
  const $goal = document.getElementById('goal');
  const $goalResult = document.getElementById('goalResult');
  const $goalReached = document.getElementById('goalReached');
  const $goalReachedResult = document.getElementById('goalReachedResult');
  const $claimRefund = document.getElementById("claimRefund");
  const $claimRefundResult = document.getElementById("claimRefundResult");
  const $isOpen = document.getElementById('isOpen');
  const $isOpenResult = document.getElementById('isOpenResult');
  const $openingTime = document.getElementById('openingTime');
  const $openingTimeResult = document.getElementById('openingTimeResult');
  const $closingTime = document.getElementById('closingTime');
  const $closingTimeResult = document.getElementById('closingTimeResult');
  const $hasClosed = document.getElementById('hasClosed');
  const $hasClosedResult = document.getElementById('hasClosedResult');
  const $rate = document.getElementById('rate');
  const $rateResult = document.getElementById('rateResult');
  const $weiRaised = document.getElementById('weiRaised');
  const $weiRaisedResult = document.getElementById('weiRaisedResult');
  const $finalize = document.getElementById('finalize');
  const $finalizeResult = document.getElementById('finalizeResult');
  const $finalized = document.getElementById('finalized');
  const $finalizedResult = document.getElementById('finalizedResult');
  const $token = document.getElementById('token');
  const $tokenResult = document.getElementById('tokenResult');
  const $wallet = document.getElementById('wallet');
  const $walletResult = document.getElementById('walletResult');
 // const $tokenaddress = document.getElementById('tokenaddress');


  //token contract form variables
  const $decimals = document.getElementById('decimals');
  const $decimalsResult = document.getElementById('decimalsResult');
  const $name = document.getElementById('name');
  const $nameResult = document.getElementById('nameResult');
  const $symbol = document.getElementById('symbol');
  const $symbolResult = document.getElementById('symbolResult');
  const $totalSupply = document.getElementById('totalSupply');
  const $totalSupplyResult = document.getElementById('totalSupplyResult');
  const $renounceMinter = document.getElementById('renounceMinter');
  const $renounceMinterResult = document.getElementById('renounceMinterResult');

    
  const $balanceOf = document.getElementById('balanceOf');
  const $balanceOfResult = document.getElementById('balanceOfResult');
  const $addMinter  = document.getElementById('addMinter');
  const $addMinterResult  = document.getElementById('addMinterResult');
  const $isMinter  = document.getElementById('isMinter');
  const $isMinterResult  = document.getElementById('isMinterResult');
  const $mint  = document.getElementById('mint');
  const $mintResult  = document.getElementById('mintResult');
  const $decreaseAllowance  = document.getElementById('decreaseAllowance');
  const $decreaseAllowanceResult  = document.getElementById('decreaseAllowanceResult');
  const $increaseAllowance  = document.getElementById('increaseAllowance');
  const $increaseAllowanceResult  = document.getElementById('increaseAllowanceResult');
  const $allowance  = document.getElementById('allowance');
  const $allowanceResult  = document.getElementById('allowanceResult');
  const $approve  = document.getElementById('approve');
  const $approveResult  = document.getElementById('approveResult');
  const $transfer  = document.getElementById('transfer');
  const $transferResult  = document.getElementById('transferResult');
  const $transferFrom  = document.getElementById('transferFrom');
  const $transferFromResult = document.getElementById('transferFromResult');



  // const $contractResult = document.getElementById('contract-functions');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
	accounts = _accounts;
	
  });
      $buyTokens.addEventListener('submit', (e) => {
        e.preventDefault();
        //console.log($buyaddress);
        const from_address = e.target.elements[0].value.toString().toLowerCase();
        const eth_amount = parseInt(e.target.elements[1].value);
       // window.prompt(from_address);
        pupsale.methods.buyTokens(from_address).send({'from': accounts[0], 'Amount':eth_amount})
        .on('transactionHash', function(hash){
          $buyTokensResult.innerHTML = hash;
        })
        .on('receipt', function(receipt){
          $buyTokensResult.innerHTML = receipt;
        })
        .on('confirmation', function(confirmationNumber, receipt){
           $buyTokensResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
        .on('error', function(error){
          // If a out of gas error, the second parameter is the receipt.
          $buyTokensResult.innerHTML = error;
        });
      });


      $claimRefund.addEventListener('submit', (e) => {
        e.preventDefault();
        //console.log($buyaddress);
        const from_address = e.target.elements[0].value.toString().toLowerCase();
        pupsale.methods.claimRefund(from_address).send({from: accounts[0]})
        .on('transactionHash', function(hash){
          $claimRefundResult.innerHTML = hash;
        })
        .on('receipt', function(receipt){
          $claimRefundResult.innerHTML = receipt;
        })
        .on('confirmation', function(confirmationNumber, receipt){
           $claimRefundResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
        .on('error', function(error){
          // If a out of gas error, the second parameter is the receipt.
          $claimRefundResult.innerHTML = error;
        });
      });


      $cap.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.cap().call()
      .then(function (result) {
        $capResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $capResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $capReached.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.capReached().call()
      .then(function (result) {
        $capReachedResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $capReachedResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });
  
    $closingTime.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.closingTime().call()
      .then(function (result) {
        $closingTimeResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $closingTimeResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $finalize.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.finalize().call()
      .then(function (result) {
        $finalizeResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $finalizeResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $finalized.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.finalized().call()
      .then(function (result) {
        $finalizedResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $finalizedResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $goal.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.goal().call()
      .then(function (result) {
        $goalResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $goalResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $goalReached.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.goalReached().call()
      .then(function (result) {
        $goalReachedResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $goalReachedResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $hasClosed.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.hasClosed().call()
      .then(function (result) {
        $hasClosedResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $hasClosedResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $isOpen.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.isOpen().call()
      .then(function (result) {
        $isOpenResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $isOpenResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $rate.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.rate().call()
      .then(function (result) {
        $rateResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $rateResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $openingTime.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.openingTime().call()
      .then(function (result) {
        $openingTimeResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $openingTimeResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $weiRaised.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.weiRaised().call()
      .then(function (result) {
        $weiRaisedResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $weiRaisedResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });


    $token.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.token().call()
      .then(function (result) {
        $tokenResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $tokenResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });


    $wallet.addEventListener('submit', (e) => {
      e.preventDefault();
      pupsale.methods.wallet().call()
      .then(function (result) {
        $walletResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $walletResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });


    //token contract methods

    $decimals.addEventListener('submit', (e) => {
      e.preventDefault();
      pupcoin.methods.decimals().call()
      .then(function (result) {
        $decimalsResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $decimalsResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });

    $name.addEventListener('submit', (e) => {
      e.preventDefault();
      pupcoin.methods.name().call()
      .then(function (result) {
        $nameResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $nameResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });


    $symbol.addEventListener('submit', (e) => {
      e.preventDefault();
      pupcoin.methods.symbol().call()
      .then(function (result) {
        $symbolResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $symbolResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });


    $totalSupply.addEventListener('submit', (e) => {
      e.preventDefault();
      pupcoin.methods.totalSupply().call()
      .then(function (result) {
        $totalSupplyResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $totalSupplyResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });


    $renounceMinter.addEventListener('submit', (e) => {
      e.preventDefault();
      pupcoin.methods.renounceMinter().call()
      .then(function (result) {
        $renounceMinterResult.innerHTML = result;
       })
      .catch(_e => {
        console.log(_e);
        $renounceMinterResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });


    $balanceOf.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const balof_address = e.target.elements[0].value.toString().toLowerCase();
      pupcoin.methods.balanceOf(balof_address).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $balanceOfResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $balanceOfResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $balanceOfResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $balanceOfResult.innerHTML = error;
      });
    });


    $addMinter.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const addmint_address = e.target.elements[0].value.toString().toLowerCase();
      pupcoin.methods.addMinter(addmint_address).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $addMinterResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $addMinterResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $addMinterResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $addMinterResult.innerHTML = error;
      });
    });

    $isMinter.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const ismint_address = e.target.elements[0].value.toString().toLowerCase();
      pupcoin.methods.isMinter(ismint_address).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $isMinterResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $isMinterResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $isMinterResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $isMinterResult.innerHTML = error;
      });
    });


    $mint.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const mint_address = e.target.elements[0].value.toString().toLowerCase();
      const mint_amount = parseInt(e.target.elements[1].value);
      pupcoin.methods.mint(mint_address, mint_amount).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $mintResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $mintResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $mintResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $mintResult.innerHTML = error;
      });
    });


    $decreaseAllowance.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const allowance_address = e.target.elements[0].value.toString().toLowerCase();
      const dAllowanceAmount = parseInt(e.target.elements[1].value);
      pupcoin.methods.decreaseAllowance(allowance_address, dAllowanceAmount).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $decreaseAllowanceResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $decreaseAllowanceResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $decreaseAllowanceResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $decreaseAllowanceResult.innerHTML = error;
      });
    });

   
    
    $increaseAllowance.addEventListener('submit', (e) => {
      e.preventDefault();
            
      const allowance_address = e.target.elements[0].value.toString().toLowerCase();
      const inAllowanceAmount = parseInt(e.target.elements[1].value);
      pupcoin.methods.increaseAllowance(allowance_address, inAllowanceAmount).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $increaseAllowanceResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $increaseAllowanceResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $increaseAllowanceResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $increaseAllowanceResult.innerHTML = error;
      });
    });


    $allowance.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const allowance_address = e.target.elements[0].value.toString().toLowerCase();
      pupcoin.methods.allowance(accounts[0], allowance_address).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $allowanceResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $allowanceResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $allowanceResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $allowanceResult.innerHTML = error;
      });
    });


    $approve.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const approve_address = e.target.elements[0].value.toString().toLowerCase();
      const approveAmount = parseInt(e.target.elements[1].value);
      pupcoin.methods.approve(approve_address, approveAmount).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $approveResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $approveResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $approveResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $approveResult.innerHTML = error;
      });
    });


    $transfer.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const transfer_address = e.target.elements[0].value.toString().toLowerCase();
      const tAmount = parseInt(e.target.elements[1].value);
      pupcoin.methods.transfer(transfer_address, tAmount).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $transferResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $transferResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $transferResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $transferResult.innerHTML = error;
      });
    });


    $transferFrom.addEventListener('submit', (e) => {
      e.preventDefault();
      //console.log($buyaddress);
      const transfer_from_address = e.target.elements[0].value.toString().toLowerCase();
      const transfer_to_address = e.target.elements[0].value.toString().toLowerCase();
      const tAmount = parseInt(e.target.elements[1].value);
      pupcoin.methods.transferFrom(transfer_from_address, transfer_to_address, tAmount).send({from: accounts[0]})
      .on('transactionHash', function(hash){
        $transferFromResult.innerHTML = hash;
      })
      .on('receipt', function(receipt){
        $transferFromResult.innerHTML = receipt;
      })
      .on('confirmation', function(confirmationNumber, receipt){
         $transferFromResult.innerHTML = `Your Transaction Confirmation # is: ${confirmationNumber} and receipt number is : ${receipt}`; })
      .on('error', function(error){
        // If a out of gas error, the second parameter is the receipt.
        $transferFromResult.innerHTML = error;
      });
    });
  


};

document.addEventListener('DOMContentLoaded', () => {
  
  //console.log(document.readyState);
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      contracts = initContract();
      pupsale=contracts[0];
      pupcoin=contracts[1]
     //console.log(pupcoin);
     
     //document.getElementById("TokenAddress").setAttribute("value", pupcoin.address);
      loadform()
      
    initApp(); 
  })
	.catch(e => console.log(e.message));
});

const loadform = () => {
  const $contractaddress = document.getElementById("ContractAddress"); 
  //const $contractResult = document.getElementById('contract-functions');
  //console.log(`Contract Method: ${contract_methods}`);
  $contractaddress.innerHTML = `Token Sale Address: ${pupsale_address} <br> Token Address : ${pup_address}`;
  //console.log("311");
  var k;
  for (k=0; k < contracts.length; k++){

    var methods = contracts[k].methods;
    methods.f = function f() {};
    for(var method in methods){
      if (!method.startsWith('0x') && method.includes(')') && method.length > 2) {
        if(k==0){
          contract_methods.push(method);
          var func_count = contract_methods.length;
           var func_names = contract_methods;
           
        }
        else{
          token_methods.push(method);
          var func_count = token_methods.length;
           var func_names = token_methods;
           
        };
      };
  };
  
  
  //$contractResult.setAttribute('size', func_count);
  //$contractResult.setAttribute('name', func_names);
  var i; 
    for(i=0; i < Number(func_count); i++){
        //window.prompt(i, func_names[i]);
        var func_args = func_names[i].split("(")[1].split(")")[0];
        if (func_args.includes(",")){
          func_args = func_args.split(",");
        };
        //window.prompt(func_args);
        var form = document.createElement("form");
        form.setAttribute("name", func_names[i].split("(")[0]+"form_"+k); 
        form.setAttribute("id", func_names[i].split("(")[0]); 
        form.setAttribute("action", "");
        form.setAttribute("onsubmit", "return false");
        var title = document.createElement("h4", func_names[i]);
        
        if (typeof func_args =='object' && func_args.length > 0){
          //window.prompt(func_names[i].split("(")[0].includes("buy"));
          var j;
          for (j=0; j <= func_args.length; j++){
            //window.prompt(func_names[i].split("(")[0]);
            if (func_args[j]){
              var ID = document.createElement("input");
              ID.setAttribute("id", func_args[j] +j+i); 
              ID.setAttribute("type", "text"); 
              ID.setAttribute("name", func_args[j]); 
              ID.setAttribute("placeholder", func_args[j]); 
              form.append(ID);
            };
          };
            
        };
        if (func_args.length > 0 && typeof func_args !=='object'){
          var ID = document.createElement("input");
          ID.setAttribute("id", func_args + i + func_count); 
          ID.setAttribute("type", "text"); 
          ID.setAttribute("name", func_args); 
          ID.setAttribute("placeholder", func_args); 
          form.append(ID);
        };
      
        if(func_names[i].split("(")[0].includes("buy")){
        var token = document.createElement("input");
        token.setAttribute("id", "Amount"); 
        token.setAttribute("type", "text"); 
        token.setAttribute("name", "Amount"); 
        token.setAttribute("placeholder", "Amount in Ether"); 
        form.append(token);
        };

         // Create a submit button 
        var s = document.createElement("input"); 
        s.setAttribute("type", "submit"); 
        s.setAttribute("id", func_names[i].split("(")[0]+"Submit"); 
        s.setAttribute("class", "btn btn-primary");
        //s.setAttribute("width", "500"); 
        s.setAttribute("value", func_names[i].split("(")[0]); 
        if (func_args.length > 0){
          s.setAttribute("color", "Orange"); 
        };
        //s.setAttribute(evt, window.prompt(func_names[i].split("(")[0]));
        var result = document.createElement("p");
        result.setAttribute("id", func_names[i].split("(")[0]+"Result");
        form.append(s);
        form.append(result);  
        if(k==0){
           document.getElementById('tokens').append(form);
        }
        else {
          document.getElementById('contract').append(form);
        };
        
        document.styleSheets[0];
        
    };
  };

};
