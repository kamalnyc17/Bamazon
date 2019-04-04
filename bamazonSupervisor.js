// include npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// define connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// set up connection and test it
connection.connect(function(err){
    if (err) throw err;
    console.log( "hello");
});

// program starts here
showMenu();

// function to display menu
function showMenu() {
    // clear the console
    console.log('\033c');
    // menu selection
    inquirer
        .prompt([
            {
                type: "list",
                name: "wish",
                choices: ["View Product Sales by Department", "Create New Department", "Exit"],
                message: '\nWhat would you like to do? '
            }
        ]).then( answer => {
            switch (answer.wish){
                case "View Product Sales by Department":
                    showSale();
                    break;
                case "Create New Department":
                    createDept();
                    break;
                case "Exit":
                    connection.end();
                    break;
                default:
                console.log( `\x1b[1m \x1b[31m\nERROR! Invalid Selection\x1b[0m`);
            }
        })
}

// function to show sale
function showSale(){    
    // clear the console
    console.log('\033c');
    // displaying the product list
    console.log(`\x1b[7m  Product Sales By Department  \x1b[0m`);
    // creating the query string
    var query = 'SELECT D.department_id AS "DeptID", D.department_name AS "Department", D.over_head_costs AS "OverHeadCosts", SUM(P.product_sales) AS "ProductSales", '; 
    query += 'SUM(P.product_sales) - D.over_head_costs AS "TotalProfit" FROM departments D INNER JOIN products P ON D.department_name = P.department_name ';
    query += 'GROUP BY D.department_id';

    connection.query(
        query,
        function(err, res){
            if (err) throw err;

            console.table(
                res.map(rowData => {
                    return{                        
                    "Dept ID": rowData.DeptID,
                    "Department Name": rowData.Department,
                    "Over Head Costs": rowData.OverHeadCosts,
                    "Product Sales": rowData.ProductSales,
                    "Total Profit": rowData.TotalProfit
                    }
                })
            );
            endRepeat();
        }
    );
}

// function to create new department
function createDept(){
    
    // clear the console
    console.log('\033c');
    // displaying the product list
    console.log(`\x1b[7m  Creating New Department  \x1b[0m`);
    // user input starts here
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the Department ID: ',
                validate: function(value){
                    if (value.trim().length < 2) {
                        console.log(`\x1b[1m \x1b[31m\nERROR! Invalid Department ID\x1b[0m`);
                        return false;
                    } return true;
                }
            },
            {
                type: 'input',
                name: 'department_name',
                message: "Enter the Name of the Department: ",
                validate: function(value){
                    if (value.trim().length < 4) {
                        console.log(`\x1b[1m \x1b[31m\nERROR! Invalid Department Name\x1b[0m`);
                        return false;
                    } return true;
                }
            },
            {
                type: 'input',
                name: 'over_head_costs',
                message: 'Enter the Overhead Costs for this Department: ',
                validate: function(value){                    
                    if (!isNaN(value) && parseFloat(value) > 0) {
                        return true
                    } else {
                        console.log(`\x1b[1m \x1b[31m\nOverhead Costs must be more that zero\x1b[0m`);
                        return false
                    }
                }
            }
        ]).then( answer => {
            // at the end of data entry, ask for user confirmation before updating the database
            inquirer
            .prompt([{
                type: "list",
                name: "wish",
                message: "\nAre You Sure you want to Add this new Department?",
                choices: ["Yes", "No"]
            }]).then( ans => {
                if (ans.wish === "Yes"){
                    connection.query(
                        "INSERT INTO departments SET ?", 
                        {
                          department_id: answer.department_id,
                          department_name: answer.department_name,
                          over_head_costs: answer.over_head_costs,
                        },
                        function (err) {
                          if (err) throw err;
                          console.log(`\x1b[1m\x1b[32m\nSUCCESS! The Following Department has been Created!\x1b[0m`);                
                          console.table(
                                {         
                                  "Dept ID": answer.department_id,
                                  "Department": answer.department_name,
                                  "Overhead Costs": answer.over_head_costs
                                }
                            );
                          endRepeat();
                        }
                    );
                } else {
                    console.log(`\x1b[1m \x1b[31m\nOkay. This Department was not added to the databse\x1b[0m`);
                    endRepeat();
                }

            });            
        });
}

// function to repeat or end program
function endRepeat() {
    inquirer
        .prompt([{
            type: "list",
            name: "wish",
            message: "\nDo you want to perform another operation?",
            choices: ["Yes", "No"]
        }]).then( answer => {
            if (answer.wish === "Yes") {
                showMenu();
            } else {
                connection.end();
            }
        })
}