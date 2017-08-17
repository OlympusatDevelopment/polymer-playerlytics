import { expect } from 'chai';
import Collo from 'Src/index.js';
//import Collo from 'Lib/index.min.js';

const c = [
    {
      id: 1,
      name: 'Adam'
    },
    {
      id: 2,
      name: 'Juliana'
    }
];

// For testing you can toggle this boolean to run the promisified tests or the returns
const promisify = true;
const collection = new Collo(c);

if(promisify){
	collection.promisify();
}else{

	// If promisify was on, it will be turned off
	collection.unPromisify();
}

//console.log('COLLECTION************',collection.prototype);

// list
describe('The list fn', () => {
	it('should return the same collection', () => {
		if(!promisify) {
			expect(collection.list()).to.equal(c);
		}else{
			collection
				.list()
				.then(res=>{
					expect(res).to.equal(c);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


// findWhere
describe('The findWhere fn', () => {
	it('should return the Adam object', () => {
		if(!promisify){
			expect(collection.findWhere({id:1}))
				.to
				.deep
				.equal({
					id: 1,
					name: 'Adam'
				});

		}else{
			collection.findWhere({id:1})
				.then(res=>{
					expect(res)
						.to
						.deep
						.equal({
							id: 1,
							name: 'Adam'
						});
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});

describe('The findWhere fn', () => {
	it('should return null given a bad input', () => {
		if(!promisify) {
			expect(collection.findWhere([]))
				.to
				.deep
				.equal(null);
		}else{
			collection
				.findWhere([])
				.then(res=>{
					expect(res)
						.to
						.deep
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});

// exists
describe('The exists fn', () => {
	it('should return true', () => {
		if(!promisify) {
			expect(collection.exists({id: 2}))
				.to
				.equal(true);
		}else{
			collection.exists({id:2})
				.then(res=>{
					expect(res)
						.to
						.equal(true);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


describe('The exists fn', () => {
	it('should return null given a bad input', () => {
		if(!promisify) {
			expect(collection.exists([]))
				.to
				.deep
				.equal(null);
		}else{
			collection.exists([])
				.then(res=>{
					expect(res)
						.to
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});

// insert
describe('The insert fn', () => {
	it('should return the collection with one more item in it', () => {
		let _c = c;

		_c.push({
			id: 3,
			name: 'Paki Paki'
		});

		if(!promisify) {
			expect(collection.insert({
				id  : 3,
				name: 'Paki Paki'
			}))
				.to
				.deep
				.equal(_c);
		}else{
			collection.insert({
				id: 3,
				name: 'Paki Paki'
			})
				.then(res=>{
					expect(res)
						.to
						.deep
						.equal(_c);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


describe('The insert fn', () => {
	it('should return null given a bad input', () => {
		if(!promisify) {
			expect(collection.insert([]))
				.to
				.equal(null);
		}else{
			collection.insert([])
				.then(res=>{
					expect(res)
						.to
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});

// insertAtIndex
describe('The insertAtIndex fn', () => {
	it('should return the same collection as the test', () => {
		let _c = c;
		const index = 1;

		_c.splice(index,0,{
			id: 5,
			name: 'Mirom'
		});

		if(!promisify) {
			expect(collection.insertAtIndex({
				id: 3,
				name: 'Paki Paki'
			},index))
				.to
				.deep
				.equal(_c);
		}else{
			collection.insertAtIndex({
					id: 3,
					name: 'Paki Paki'
				},index)
				.then(res=>{
					expect(res)
						.to
						.deep
						.equal(_c);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


describe('The insertAtIndex fn', () => {
	it('should return null given a bad input', () => {
		if(!promisify) {
			expect(collection.insertAtIndex([]))
				.to
				.deep
				.equal(null);
		}else{
			collection.insertAtIndex([])
				.then(res=>{
					expect(res)
						.to
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


// upsert not found
describe('The upsert [NO found item] fn', () => {
	it('should return the same collection as the input plus the new item', () => {
		const collection = new Collo([
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana'
			}
		]);

		let _c = [
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana'
			},
			{
				id: 3,
				name: 'Paki Paki'
			}
		];

		if(!promisify) {
			expect(collection.upsert({id:3},{
				id: 3,
				name: 'Paki Paki'
			}))
				.to
				.deep
				.equal(_c);
		}else{
			collection.promisify();

			collection.upsert({id:3},{
					id: 3,
					name: 'Paki Paki'
				})
				.then(res=>{
					expect(res)
						.to
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});

// upsert item FOUND
describe('The upsert [Item FOUND] fn', () => {
	it('should return the same collection as the input plus the new item', () => {
		const collection = new Collo([
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana'
			}
		]);

		let _c = [
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana & Mila'
			}
		];

		if(!promisify) {
			expect(collection.upsert({id:2},{
				id: 2,
				name: 'Juliana & Mila'
			}))
				.to
				.deep
				.equal(_c);
		}else{
			collection.promisify();

			expect(collection.upsert({id:2},{
				id: 2,
				name: 'Juliana & Mila'
			}))
				.then(res=>{
					expect(res)
						.to
						.equal(_c);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});

describe('The upsert fn', () => {
	it('should return null given a bad input', () => {
		if(!promisify) {
			expect(collection.upsert([]))
				.to
				.deep
				.equal(null);
		}else{
			collection.upsert([])
				.then(res=>{
					expect(res)
						.to
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});

// updateWhere
describe('The updateWhere fn', () => {
	it('should return the same collection as the test', () => {
		const collection = new Collo([
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana'
			}
		]);

		let _c = [
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana & Mila'
			}
		];

		if(!promisify) {
			expect(collection.updateWhere({id:2},{
				id: 2,
				name: 'Juliana & Mila'
			}))
				.to
				.deep
				.equal(_c);
		}else{
			collection.promisify();

			collection.updateWhere({id:2},{
					id: 2,
					name: 'Juliana & Mila'
				})
				.then(res=>{
					expect(res)
						.to
						.deep
						.equal(_c);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


describe('The updateWhere fn', () => {
	it('should null null given a bad input', () => {
		if(!promisify) {
			expect(collection.updateWhere([]))
				.to
				.deep
				.equal(null);
		}else{
			collection.updateWhere([])
				.then(res=>{
					expect(res)
						.to
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});

// removeWhere
describe('The removeWhere fn', () => {
	it('should return the same collection as the test', () => {
		const collection = new Collo([
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana'
			},
			{
				id: 3,
				name: 'Chiggy'
			}
		]);

		let _c = [
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana'
			},
			{
				id: 3,
				name: 'Chiggy'
			}
		];

		const key = 'id',
			  value = 2;

		const coll = _c.filter(item => item[key] && !(item[key] === value));

		if(!promisify) {
			expect(collection.removeWhere({id:2}))
				.to
				.deep
				.equal(coll);
		}else{
			collection.promisify();

			collection.removeWhere({id:2})
				.then(res=>{
					expect(res)
						.to
						.deep
						.equal(coll);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


describe('The removeWhere fn', () => {
	it('should return null given a bad input', () => {
		if(!promisify) {
			expect(collection.removeWhere([]))
				.to
				.deep
				.equal(null);
		}else{
			collection.removeWhere([])
				.then(res=>{
					expect(res)
						.to
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


// getTheIndexOf
describe('The getTheIndexOf fn', () => {
	it('should return the index of the item in the collection', () => {
		const collection = new Collo([
			{
				id: 1,
				name: 'Adam'
			},
			{
				id: 2,
				name: 'Juliana'
			},
			{
				id: 3,
				name: 'Chiggy'
			}
		]);

		if(!promisify) {
			expect(collection.getTheIndexOf({id:2}))
				.to
				.equal(1);
		}else{
			collection.promisify();

			collection.getTheIndexOf({id:2})
				.then(res=>{
					expect(res)
						.to
						.equal(1);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});


describe('The getTheIndexOf fn', () => {
	it('should return null given a bad input', () => {
		if(!promisify) {
			expect(collection.getTheIndexOf([]))
				.to
				.deep
				.equal(null);
		}else{
			collection.getTheIndexOf([])
				.then(res=>{
					expect(res)
						.to
						.equal(null);
				})
				.catch(err=>{
					expect(err).to.equal(null);
				});
		}
	});
});



