// importing npm packages
var mysql    = require('mysql');
var inquirer = require('inquirer');

// define connection to sql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

// set up connection and test it
connection.connect(function(err){
    if (err) throw err;

    console.log( "hello");
});

// program starts here
showMenu()

// function to display the menu
function showMenu() {
    // clear the console
    console.log('\033c');
    // menu selection
    inquirer
        .prompt([
            {
                name: 'menuChoice',
                type: 'list',
                message: '\nWhat would you like to do? ',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
            }
        ]).then( function(answer){
            switch (answer.menuChoice){
                case 'View Products for Sale':
                    showProduct();
                    break;
                case 'View Low Inventory':
                    showLowInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    addProduct();
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log( `\x1b[1m \x1b[31m\nERROR! Invalid Selection\x1b[0m`);
            }
        });
}

// function to show products
function showProduct() {
    // clear the console
    console.log('\033c');
    // displaying the product list
    console.log(`\x1b[7m  Our Existing Products  \x1b[0m`);
    connection.query(
        'SELECT * FROM products',
        function(err, res){
            if (err) throw err;

            console.table(
                res.map(rowData => {
                    return{                        
                    "Item ID": rowData.item_id,
                    "Product Name": rowData.product_name,
                    "Price": rowData.price,
                    "Quantity": rowData.stock_quantity
                    }
                })
            );
            endRepeat();
        }
    );
}






// function to repeat or end program
function endRepeat() {
    inquirer
        .prompt([{
            type: "list",
            name: "wish",
            message: "\nDo you want to perform another operation?",
            choices: ["Yes", "No"]
        }]).then(function (answer) {
            if (answer.wish === "Yes") {
                showMenu();
            } else {
                connection.end();
            }
        })
}