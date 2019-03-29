// clear the console
console.log('\033c');

// importing npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// define connection to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

// setup connection and test it
connection.connect(function (err) {
    if (err) throw err;

    //console.log( `Connection Established. ID# ${connection.threadId}`);
})

// display existing products
console.log(`\x1b[7m  Our Existing Products  \x1b[0m`);
connection.query("SELECT * from products", function (err, res) {
    if (err) throw err;

    console.table(
        res.map(rowData => {
            return {
                "Item ID": rowData.item_id,
                "Product Name": rowData.product_name,
                "Price": rowData.price
            };
        })
    );
    userInput()
})

// ask for user input and process data
function userInput() {
    inquirer
        .prompt([{
                type: "input",
                message: "Enter the Item ID you want to purchase:",
                name: "itemID"
            },
            {
                type: "input",
                message: "How many units you would like to purchase?",
                name: "qty",
                validate: function (value) {
                    if (!isNaN(value) && parseInt(value) > 0) {
                        return true
                    } else {
                        console.log(`\x1b[1m \x1b[31m\nUnits must be more that zero\x1b[0m`);
                        return false
                    }
                }
            }
        ]).then(function (answer) {
            connection.query(
                "SELECT stock_quantity, price FROM products WHERE ?", {
                    item_id: answer.itemID
                },
                function (err, res) {
                    if (err) throw err;

                    // comparing the product
                    var qty = res[0].stock_quantity;
                    var price = res[0].price;
                    if (qty < answer.qty) {
                        console.log(`\x1b[1m\x1b[31m\nInsufficient quantity! Try smaller quantity!\x1b[0m`);
                    } else {
                        console.log(`\x1b[1m\x1b[32m\nSUCCESS! Your Order is Confirmed!\x1b[0m`);
                        var newQty = qty - answer.qty;

                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [{
                                    stock_quantity: newQty
                                },
                                {
                                    item_id: answer.itemID
                                }
                            ],
                            function(err){
                                if (err) throw err;
                                console.log(`\x1b[1m\Total Cost for this Purchase: ${price * answer.qty}\x1b[0m`)
                            }
                        )
                    }

                    // end of program
                    connection.end();
                })
        })
}