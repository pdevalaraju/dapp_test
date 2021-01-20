import Web3 from 'web3';
import PupperDeployer from './src/contracts/PupperCoinSaleDeployer.json';
import PupperSale from './src/contracts/PupperCoinSale.json';
//import PupperCoin from '../build/contracts/PupperCoin.json';

let web3;
let pupdeployer;
let pupsale;
//let pupcoin;
let contract_methods =[];

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
  //console.log(deploymentKey);
  
  pupdeployer = new web3.eth.Contract(
              PupperDeployer.abi, 
              PupperDeployer
              .networks[deploymentKey]
              .address
  );
  const pupsale_address = pupdeployer.methods.token_sale_address().call()
  .then(function (result) {console.log(result);});
  console.log(pupsale_address);
  pupsale= new web3.eth.Contract(PupperSale.abi, pupsale_address);
  console.log(pupsale.address);
  return pupsale;
};

const initApp = () => {
 
  const $cap = document.getElementById("cap");
  const $capResult = document.getElementById("capResult");
 
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
	accounts = _accounts;
	
  });
 
      $cap.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(e);
      pupsale.methods.cap().call()
      .then(result => {
        $capResult.innerHTML = result;
        console.log(`Coin Cap is ${result}`);
      })
      .catch(_e => {
        $capResult.innerHTML = `Ooops... there was an error while trying to get Data...`;
      });
    });
  
};

document.addEventListener('DOMContentLoaded', () => {
    //console.log(document.readyState);
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      pupsale = initContract();
      //console.log(pupsale.address[0]);
      console.log(pupsale.options);
    const methods = pupsale.methods;
    
	  methods.f = function f() {};
	  
	  for(const method in methods){
	 
	  if (!method.startsWith('0x') && method.includes(')') && method.length > 2) {
      contract_methods.push(method)
		  };
		};
    //console.log(`Contract Method: ${contract_methods}`);
    
    const $contractResult = document.getElementById('contract-functions');
    $contractResult.setAttribute('size', contract_methods.length);
    $contractResult.setAttribute('name', contract_methods);

    var func_count = contract_methods.length;
    var func_names = contract_methods;
    var i; 
      for(i=0; i < Number(func_count); i++){
          //window.prompt(i, func_names[i]);
          const func_args = func_names[i].split("(")[1].split(")")[0];
          if (func_args.includes(",")){
            func_args = func_args.split(",");
          };
          //window.prompt(func_args);
          var form = document.createElement("form");
          form.setAttribute("id", func_names[i].split("(")[0]); 
          //form.setAttribute("action", "");
          form.setAttribute("onsubmit", "return false");
					var title = document.createElement("h4", func_names[i]);
          //window.prompt(typeof func_args);
          if (func_args.length > 0 && typeof func_args =='object'){
            //window.prompt(func_names[i].split("(")[0].includes("buy"));
            for (j=0; j < func_args.length; j++){
              var ID = document.createElement("input");
              ID.setAttribute("id", func_args[j]); 
              ID.setAttribute("type", "text"); 
              ID.setAttribute("name", func_args[j]); 
              ID.setAttribute("placeholder", func_args[j]); 
            };
              
          };
          if (func_args.length > 0){
          var ID = document.createElement("input");
          ID.setAttribute("id", func_args + i); 
          ID.setAttribute("type", "text"); 
          ID.setAttribute("name", func_args); 
          ID.setAttribute("placeholder", func_args); 
          form.append(ID);
          }
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
          s.setAttribute("id", func_names[i].split("(")[0]+"Id"); 
          s.setAttribute("class", "btn btn-primary");
          //s.setAttribute("width", "500"); 
          s.setAttribute("value", func_names[i].split("(")[0]); 
          //s.setAttribute(evt, window.prompt(func_names[i].split("(")[0]));
          var result = document.createElement("p");
          result.setAttribute("id", func_names[i].split("(")[0]+"Result");
          form.append(s);
          form.append(result);  
          document.getElementById('loadcontract').append(form);
        };
    		
	  initApp(); 
	 
    })
	.catch(e => console.log(e.message));
	
});

