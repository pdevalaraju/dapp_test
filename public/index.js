//import Web3 from 'web3';
//import Crud from 'Crud.json';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Web3 = artifacts.require('web3');
const Crud = artifacts.require('Crud.json');

let web3;
let crud;

const initWeb3 = () => {
	return new Promise((resolve, reject) => {
		//case 1: old metamask is present
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum);
			window.ethereum.enbale()
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

		//case2: new metamask is present
		if (typeof window.web3 !== 'undefined') {
			return resolve(
				new Web3(window.web3.currentProvider)
			);
		}
		//case 3: no metamask present, just connect to ganache
		resolve(new Web3('http://localhost:8545'));
	});
}

const initContract =() => {
	const deploymentKey = object.keys(Crud.networks)[0]
	return new web3.eth.Contract(
	Crud.abi,
	Crud.networks[deploymentKey].address
	);
};

const initApp = () => {
	const $create= document.getElementByID('create');
	const $createResult = document.getElementByID('read-result');
	const $read= document.getElementByID('create');
	const $readResult = document.getElementByID('read-result');
	const $edit= document.getElementByID('edit');
	const $editResult = document.getElementByID('edit-result');
	const $delete= document.getElementByID('delete');
	const $deleteResult = document.getElementByID('delete-result');
	let accounts=[];

	web3.eth.getAccounts().then(_accounts => {
	accounts=_accounts;
	});

$create.addEventListener('submit', e => {
			e.preventDefault();
			const name = e.target.elements[0].value;
			crud.methods
			.create(name).send({from: accounts[0]})
			.then(() =>{
	
		$createResult.innerHTML = 'New User ${name} was successfully Created!';})
			.catch(() => {
				$createResult.innerHTML = 'Ooops! there was an error creating a new User..';
		}); 
	});

$read.addEventListener('submit', e => {
	e.preventDefault();
	const id = e.target.elements[0].value;
	crud.methods
	.read(id).call()
	.then(result =>{
	$readResult.innerHTML = 'Id of the user is ${result[0]} Name: ${result[1]}';})
	.catch(() => {
		$readResult.innerHTML = 'Ooops! there was an error reading User ${id}';
		}); 
	});

$edit.addEventListener('submit', e => {
	e.preventDefault();
	const id = e.target.elements[0].value;
	const name = e.target.elements[1].value;
	crud.methods
	.update(id, name).send({from: accounts[0]})
	.then(() =>{
	$editResult.innerHTML = 'Changed the name of user ${id} to: ${name}';})
	.catch(() => {
		$editResult.innerHTML = 'Ooops! there was an error updating User ${id}';
		}); 
	});

$delete.addEventListener('submit', e => {
	e.preventDefault();
	const id = e.target.elements[0].value;
	crud.methods
	.destroy(id).send({from: accounts[0]})
	.then(() =>{
	$deleteResult.innerHTML = 'Deleted the user ${id}';})
	.catch(() => {
		$deleteResult.innerHTML = 'Ooops! there was an error deleting User ${id}';
		}); 
	});

document.addEventListner('DOMContentLoaded', () => {
	initWeb3().then(_web3 => {
	web3=_web3;
	crud = initContract();
	initApp();
	}).catch(e => console.log(e.message));

});

}