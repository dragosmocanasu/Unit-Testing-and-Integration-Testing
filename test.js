// Order of execution:
// npm i
// to run just the tests: npm test
// to test code coverage: npm run coverage
let mocha = require('mocha');
let chai = require('chai');
let describe = mocha.describe;
let expect = chai.expect;
let assert = require('chai').assert;

chai.should();

let Purchase = require("./purchase.js");

describe('Purchase', () => {
    describe('Internet connection functionality', () => {
        let purchase;

        beforeEach(() => {
            purchase = new Purchase(0, false, 0, []);
        });

        describe('Check the internet connection data type', () => {
            it('should be a boolean', () => {
                purchase.internetConnection(true);
                assert.isBoolean(purchase.isInternetConnection);
            });
            it('should only accept boolean values', () => {
                const invalidValues = ['true', 1, 1.1];
                const errorMessage = 'isInternetConnectionChecked must be a boolean.';
                for (let i = 0; i < invalidValues.length; i++) {
                    console.log(invalidValues[i]);
                    expect(() => purchase.internetConnection(invalidValues[i])).to.throw(errorMessage);
                }
            });
        });

        describe('Check if the internet connection is included', () => {
            it('should be equal with true', () => {
                purchase.internetConnection(true);
                purchase.isInternetConnection.should.equal(true);
            });
            it('should not be equal with false', () => {
                purchase.internetConnection(true);
                purchase.isInternetConnection.should.not.equal(false);
            });
            it('should total price be equal with 200', () => {
                purchase.internetConnection(true);
                purchase.totalPrice.should.equal(200);
            });
            it('should total price not be equal with 0', () => {
                purchase.internetConnection(true);
                purchase.totalPrice.should.not.equal(0);
            });
            it('should return 200', () => {
                purchase.internetConnection(true).should.equal(200);
            });
            it('should not return 0', () => {
                purchase.internetConnection(true).should.not.equal(0);
            });
        });

        describe('Check if the internet connection is excluded', () => {
            it('should be equal with false', () => {
                purchase.internetConnection(false);
                purchase.isInternetConnection.should.equal(false);
            });
            it('should not be equal with true', () => {
                purchase.internetConnection(false);
                purchase.isInternetConnection.should.not.equal(true);
            });
            it('should total price be equal with 0', () => {
                purchase.internetConnection(false);
                purchase.totalPrice.should.equal(0);
            });
            it('should total price not be equal with 200', () => {
                purchase.internetConnection(false);
                purchase.totalPrice.should.not.equal(200);
            });
            it('should return 0', () => {
                purchase.internetConnection(false).should.equal(0);
            });
            it('should not return 200', () => {
                purchase.internetConnection(false).should.not.equal(200);
            });
        });
    });
    /*
        Equivalence partitioning
        Valid partitions: 0
                          1-8
        Invalid partitions: <0
                            >8
                            Non-numeric characters
                            Real (decimal) numbers

        Boundary values
        Invalid lower boundary: -1
        Valid lower boundary: 0,1
        Valid upper boundary: 7,8
        Invalid upper boundary: 9

        Middle value: 4
     */
    describe('Phone lines functionality', () => {
        let purchase;

        beforeEach(() => {
            purchase = new Purchase(0, false, 0, []);
        });

        describe('Should only accept integers when adding', () => {
            it('should not accept floats', () => {
                purchase.phoneLines = 2.3;
                expect(() => purchase.addPhoneLines()).to.throw('phoneLines must be an integer between 0 and 8.');
            });
            it('should not accept strings', () => {
                purchase.phoneLines = "myString"
                expect(() => purchase.addPhoneLines()).to.throw('phoneLines must be an integer between 0 and 8.');
            });
        });

        describe('Should only accept integers when removing', () => {
            it('should not accept floats', () => {
                purchase.phoneLines = 7.6;
                expect(() => purchase.removePhoneLines()).to.throw('phoneLines must be an integer between 0 and 8.');
            });
            it('should not accept strings', () => {
                purchase.phoneLines = "testString"
                expect(() => purchase.removePhoneLines()).to.throw('phoneLines must be an integer between 0 and 8.');
            });
        });

        describe('Should only accept valid partitions of integers when adding', () => {
            it('should not accept negatives', () => {
                purchase.phoneLines = -1;
                expect(() => purchase.addPhoneLines()).to.throw('The minimum number of phone lines that can be hired is 0.');
            });
            it('should not accept values above 7', () => {
                purchase.phoneLines = 8;
                expect(() => purchase.addPhoneLines()).to.throw('The maximum number of phone lines that can be hired is 8.');
            })
        });

        describe('Should only accept valid partitions of integers when removing', () => {
            it('should not accept negatives', () => {
                purchase.phoneLines = 0;
                expect(() => purchase.removePhoneLines()).to.throw('The minimum number of phone lines that can be hired is 0.');
            });
            it('should not accept values above 8', () => {
                purchase.phoneLines = 9;
                expect(() => purchase.removePhoneLines()).to.throw('The maximum number of phone lines that can be hired is 8.');
            })
        });

        describe('Should check if phone lines are included', () => {
            let dataProvider = [0,1,4,7];
            it('should calculate the total price after 1 addition', () => {
                for (let i = 0; i < dataProvider.length; i ++) {
                    purchase.phoneLines = dataProvider[i];
                    purchase.totalPrice = dataProvider[i] * 150;
                    purchase.addPhoneLines();
                    purchase.totalPrice.should.equal((dataProvider[i] + 1) *150);
                }
            });
            it('after 1 addition, total price should not be equal to the one before', () => {
                for (let i = 0; i < dataProvider.length; i ++) {
                    purchase.phoneLines = dataProvider[i];
                    purchase.addPhoneLines();
                    purchase.totalPrice.should.not.equal(dataProvider[i] * 150);
                }
            });
            it('phone lines should increase with 1', () => {
                for (let i = 0; i < dataProvider.length; i ++) {
                    purchase.phoneLines = dataProvider[i];
                    purchase.addPhoneLines();
                    purchase.phoneLines.should.equal(dataProvider[i] + 1);
                }
            });
            it('after 1 addition, nr of phone lines should not be equal to the ones before', () => {
                for (let i = 0; i < dataProvider.length; i ++) {
                    purchase.phoneLines = dataProvider[i];
                    purchase.addPhoneLines();
                    purchase.phoneLines.should.not.equal(dataProvider[i]);
                }
            });
        });

        describe('Should check if phone lines are excluded', () => {
            let dataProvider = [1,4,7,8];
            it('should calculate the total price after 1 deletion', () => {
                for (let i = 0; i < dataProvider.length; i ++) {
                    purchase.phoneLines = dataProvider[i];
                    purchase.totalPrice = dataProvider[i] * 150;
                    purchase.removePhoneLines();
                    purchase.totalPrice.should.equal((dataProvider[i] - 1) * 150);
                }
            });
            it('after 1 deletion, total price should not be equal to the one before', () => {
                for (let i = 0; i < dataProvider.length; i ++) {
                    purchase.phoneLines = dataProvider[i];
                    purchase.removePhoneLines();
                    purchase.totalPrice.should.not.equal(dataProvider[i] * 150);
                }
            });
            it('phone lines should decrease with 1', () => {
                for (let i = 0; i < dataProvider.length; i ++) {
                    purchase.phoneLines = dataProvider[i];
                    purchase.removePhoneLines();
                    purchase.phoneLines.should.equal(dataProvider[i] - 1);
                }
            });
            it('after 1 deletion, nr of phone lines should not be equal to the one before', () => {
                for (let i = 0; i < dataProvider.length; i ++) {
                    purchase.phoneLines = dataProvider[i];
                    purchase.removePhoneLines();
                    purchase.phoneLines.should.not.equal(dataProvider[i]);
                }
            });
        });

    });
    describe('Buying functionality', () => {
        let purchase;

        beforeEach(() => {
            purchase = new Purchase(0, false, 0, []);
        });

        describe('Check the buying functionality return type', () => {
            it('should be a string if there is nothing selected', () => {
                assert.isString(purchase.showBuyingReceipt());
            });
            it('should be a string if there is something selected', () => {
                purchase.internetConnection(true);
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.removePhoneLines();
                purchase.selectCellPhone('iPhone 99');
                purchase.selectCellPhone('iPhone 99');
                purchase.unselectCellPhone('iPhone 99');
                purchase.selectCellPhone('Samsung Galaxy 99');
                assert.isString(purchase.showBuyingReceipt());
            });
        });

        describe('Check if there is nothing selected', () => {
            it('should be equal with "Nothing is selected! Please select an item!"', () => {
                purchase.showBuyingReceipt().should.equal("Nothing is selected! Please select an item!");
            });
        });

        describe('Check if there is something selected', () => {
            it('should be equal with true internet connection and 200 DKK total price', () => {
                purchase.internetConnection(true);
                purchase.showBuyingReceipt().should.equal('Internet Connection: ' + true + '\n' +
                    'Total Price: ' + 200 + ' DKK'
                );
            });
            it('should be equal with one phone lines and 150 DKK total price', () => {
                purchase.addPhoneLines();
                purchase.showBuyingReceipt().should.equal('Number of Phone Lines: ' + 1 + '\n' +
                    'Total Price: ' + 150 + ' DKK'
                );
            });
            it('should be equal with one iPhone 99 cell phone and 6000 DKK total price', () => {
                purchase.selectCellPhone('iPhone 99');
                purchase.showBuyingReceipt().should.equal('Cell Phones: ' + 'iPhone 99' + '\n' +
                    'Total Price: ' + 6000 + ' DKK'
                );
            });
            it('should be equal with true internet connection, 2 phone lines and 500 DKK total price', () => {
                purchase.internetConnection(true);
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.showBuyingReceipt().should.equal('Internet Connection: ' + true + '\n' +
                    'Number of Phone Lines: ' + 2 + '\n' +
                    'Total Price: ' + 500 + ' DKK'
                );
            });
            it('should be equal with true internet connection, 1 iphone, 1 samsung and 7200 DKK total price', () => {
                purchase.internetConnection(true);
                purchase.selectCellPhone('iPhone 99');
                purchase.selectCellPhone('Samsung Galaxy 99');
                purchase.showBuyingReceipt().should.equal('Internet Connection: ' + true + '\n' +
                    'Cell Phones: ' + 'iPhone 99,Samsung Galaxy 99' + '\n' +
                    'Total Price: ' + 7200 + ' DKK'
                );
            });
            it('should be equal with 4 phone lines, 1 motorola, 1 samsung, 1 huawei and 3300 DKK total price', () => {
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.selectCellPhone('Motorola G99');
                purchase.selectCellPhone('Samsung Galaxy 99');
                purchase.selectCellPhone('Huawei 99');
                purchase.showBuyingReceipt().should.equal('Number of Phone Lines: ' + 4 + '\n' +
                    'Cell Phones: ' + 'Motorola G99,Samsung Galaxy 99,Huawei 99' + '\n' +
                    'Total Price: ' + 3300 + ' DKK'
                );
            });
            it('should be equal with true internet connection, one phone lines, one iPhone 99 cell phone and 6350 DKK total price', () => {
                purchase.internetConnection(true);
                purchase.addPhoneLines();
                purchase.selectCellPhone('iPhone 99');
                purchase.showBuyingReceipt().should.equal('Internet Connection: ' + true + '\n' +
                    'Number of Phone Lines: ' + 1 + '\n' +
                    'Cell Phones: ' + 'iPhone 99' + '\n' +
                    'Total Price: ' + 6350 + ' DKK'
                );
            });
            it('should be equal with true internet connection, 5 phone lines, 1 motorola, 1 iphone, 3 samsung, 1 sony, 1 huawei cell phones and 12550 DKK total price', () => {
                purchase.internetConnection(true);
                purchase.internetConnection(false);
                purchase.internetConnection(true);
                purchase.addPhoneLines();
                purchase.removePhoneLines();
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.removePhoneLines();
                purchase.addPhoneLines();
                purchase.addPhoneLines();
                purchase.selectCellPhone('Motorola G99');
                purchase.selectCellPhone('iPhone 99');
                purchase.selectCellPhone('Samsung Galaxy 99');
                purchase.selectCellPhone('Sony Xperia 99');
                purchase.selectCellPhone('Samsung Galaxy 99');
                purchase.selectCellPhone('iPhone 99');
                purchase.selectCellPhone('Huawei 99');
                purchase.selectCellPhone('Samsung Galaxy 99');
                purchase.unselectCellPhone('iPhone 99');
                purchase.showBuyingReceipt().should.equal('Internet Connection: ' + true + '\n' +
                    'Number of Phone Lines: ' + 5 + '\n' +
                    'Cell Phones: ' + 'Motorola G99,Samsung Galaxy 99,Sony Xperia 99,Samsung Galaxy 99,iPhone 99,Huawei 99,Samsung Galaxy 99' + '\n' +
                    'Total Price: ' + 12550 + ' DKK'
                );
            });
        });
    });

    describe('Select a Cell Phone functionality', () => {
        let purchase;

        beforeEach(() => {
            purchase = new Purchase(0, false, 0, []);
        });

        describe('Check if the parameter (modelName) is valid', () => {
            it('should not fail if the parameter is a String object', function(){
                expect(() => purchase.selectCellPhone(String('Text'))).to.not.throw('The parameter modelName must be a string.');
            });
            it('should not fail if the parameter is a String with single quotes', function(){
                expect(() => purchase.selectCellPhone('Text')).to.not.throw('The parameter modelName must be a string.');
            });
            it('should not fail if the parameter is a String with double quotes', function(){
                expect(() => purchase.selectCellPhone("Text")).to.not.throw('The parameter modelName must be a string.');
            });

            // Expect errors to be thrown
            it('should fail if parameter is not given', function(){
                // call selectCellPhone() with no parameters
                expect(() => purchase.selectCellPhone()).to.throw('The parameter modelName must be a string.');
            });
            it('should fail if parameter is NaN', function(){
                expect(() => purchase.selectCellPhone(NaN)).to.throw('The parameter modelName must be a string.');
            });
            it('should fail if the parameter is a literal number', function(){
                expect(() => purchase.selectCellPhone(1)).to.throw('The parameter modelName must be a string.');
            });
            it('should fail if the parameter is a Number object', function(){
                expect(() => purchase.selectCellPhone(Number(10))).to.throw('The parameter modelName must be a string.');
            });
        });

        describe('Check if error is thrown ("The Model Name must be one of the 5 available Models!")', () => {
            // Valid values
            it('should not throw error if parameter is Motorola G99', function(){
                expect(() => purchase.selectCellPhone(String('Motorola G99'))).to.not.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should not throw error if parameter is iPhone 99', function(){
                expect(() => purchase.selectCellPhone(String('iPhone 99'))).to.not.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should not throw error if parameter is Samsung Galaxy 99', function(){
                expect(() => purchase.selectCellPhone(String('Samsung Galaxy 99'))).to.not.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should not throw error if parameter is Sony Xperia 99', function(){
                expect(() => purchase.selectCellPhone(String('Sony Xperia 99'))).to.not.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should not throw error if parameter is Huawei 99', function(){
                expect(() => purchase.selectCellPhone(String('Huawei 99'))).to.not.throw('The Model Name must be one of the 5 available Models!');
            });
            // Invalid values - writing just part of the phone name
            it('should throw error if parameter is Motorola', function(){
                expect(() => purchase.selectCellPhone(String('Motorola'))).to.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should throw error if parameter is iPhone', function(){
                expect(() => purchase.selectCellPhone(String('iPhone'))).to.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should throw error if parameter is Samsung', function(){
                expect(() => purchase.selectCellPhone(String('Samsung'))).to.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should throw error if parameter is Sony', function(){
                expect(() => purchase.selectCellPhone(String('Sony'))).to.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should throw error if parameter is Huawei', function(){
                expect(() => purchase.selectCellPhone(String('Huawei'))).to.throw('The Model Name must be one of the 5 available Models!');
            });
            // Invalid values
            it('should throw error if parameter is an Empty String', function(){
                expect(() => purchase.selectCellPhone(String(''))).to.throw('The Model Name must be one of the 5 available Models!');
            });
            it('should throw error if parameter is NOT A PHONE NAME', function(){
                expect(() => purchase.selectCellPhone(String('NOT A PHONE NAME'))).to.throw('The Model Name must be one of the 5 available Models!');
            });

        });

    });
});
