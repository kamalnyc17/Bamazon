# Bamazon
## eCommerce Store using Node.JS & MySQL

![Home Page](https://github.com/kamalnyc17/Bamazon/blob/master/Images/BamazonHomePage.jpg)
## Overview
In this project we have created a CLI based eCommerce store with user interface for customers, managers and supervisors. The programs
reads data from the MySQL database and inserts/updates data as per the logic of the program.

Given below are the details of the three Modules:

## MODULE: Customer
### COMMAND: node bamazonCustomer.js
This module will display the existing products and allow the customer to make a purchase. If customer orders more than the units on hand, 
the system will reject the order and ask the customer to try again with a lower quantity.
![Customer View](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Customer_ProductView.jpg)
![Customer Error](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Customer_OutofStockView.jpg)

## MODULE: Manager
### COMMAND: node bamazonManager.js
This module will present the manager with following options: View Products for Sale, View Low Inventory, Add to Inventory, Add New Product.
Following screenshots would explain these options.

Main Menu
![Main Menu](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Manager_MainMenu.jpg)
View Products for Sale
![Product View](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Manager_ProductView.jpg)
View Low Inventory
![Low Inventory](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Manager_LowStockView.jpg)
Add to Inventory
![Add Inventory](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Manager_AddInventory.jpg)
Add New Product
![Add Product](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Manager_AddNewItem.jpg)

## MODULE: Supervisor
### COMMAND: node bamazonSupervisor.js
This module allows a supervisor to add new department as well as run a departmental summary sales report to check profitability.
Following screenshots would explain these features.

Main Menu
![Main Menu](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Supervisor_MainMenu.jpg)
View Product Sale By Department
![Sale By Dept](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Supervisor_SaleByDept.jpg)
Add New Department
![Add Dept](https://github.com/kamalnyc17/Bamazon/blob/master/Images/Supervisor_CreateDept.jpg)
