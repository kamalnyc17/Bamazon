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

// program starts here
displayList();

// function to display existing products
function displayList() {
    // clear the console
    console.log('\033c');
    // displaying the product list
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
        userInput();
    })
}

// ask for user input and process data
function userInput() {
    inquirer
        .prompt([{
                type: "input",
                message: "Enter the Item ID you want to purchase:",
                name: "itemID",
                validate: function(value){
                    if (value.trim().length < 4) {
                        console.log(`\x1b[1m \x1b[31m\nERROR! Invalid Item ID\x1b[0m`);
                        return false;
                    } return true;
                }                
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
                "SELECT stock_quantity, price, product_sales FROM products WHERE ?", {
                    item_id: answer.itemID
                },
                function (err, res) {
                    if (err) throw err;

                    var qty     = res[0].stock_quantity;
                    var price   = res[0].price;
                    var newQty  = qty - parseInt(answer.qty);
                    var totSale = res[0].product_sales + (price * parseInt(answer.qty))

                    // comparing the product inventory
                    if (qty < answer.qty) {
                        console.log(`\x1b[1m\x1b[31m\nInsufficient quantity! Try smaller quantity!\x1b[0m`);
                        endRepeat();
                    } else {
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [{
                                    stock_quantity: newQty,
                                    product_sales: totSale
                                },
                                {
                                    item_id: answer.itemID
                                }
                            ],
                            function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(`\x1b[1m\x1b[32m\nSUCCESS! Your Order is Confirmed!\x1b[0m`);
                                    console.log(`\x1b[1m\Total Cost for this Purchase: ${price * answer.qty}\x1b[0m`);
                                    endRepeat();
                                }
                            }
                        )
                    }
                })
        })
}

// function to repeat or end program
function endRepeat() {
    inquirer
        .prompt([{
            type: "list",
            name: "wish",
            message: "\nDo you want to bid on another item?",
            choices: ["Yes", "No"]
        }]).then(function (answer) {
            if (answer.wish === "Yes") {
                displayList();
            } else {
                connection.end();
            }
        })
}