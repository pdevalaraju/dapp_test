const Crud = artifacts.require('Crud');

contract('Crud', () => {
let crud = null;
before(async() => {
	crud = await Crud.deployed();
	});
it('Should Create a new user', async () => {
	await crud.create('Joe');
	const user = await crud.read(1);
	assert(user[0].toNumber() ===1);
	assert(user[1] === 'Joe');
	});

it('should update a user', async() => {
	await crud.update(1, 'Frank');
	const user = await crud.read(1);
	assert(user[0].toNumber() ===1);
	assert(user[1] === 'Frank');
	});

it('should not update a not existing user', async() => {
	try {
		await crud.update(2, 'Ram');
	} catch(e) {
		assert(e.message.includes('User doesnot exist!'));
		return;
		}
	assert(false);
	});

it('Should delete a user entry', async() => {
	await crud.destroy(1);
	try {
		await crud.read(1);
	} catch(e) {
	assert(e.message.includes('User doesnot exist!'));
		return;
		}
	assert(false);

	});

it('Should note delete a non existing user ', async() => {
	
	try {
		await crud.destroy(10);
	} catch(e) {
	assert(e.message.includes('User doesnot exist!'));
		return;
		}
	assert(false);

	});


});