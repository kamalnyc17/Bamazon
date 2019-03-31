-- delete exising database
DROP DATABASE IF EXISTS bamazon;
-- create new database
CREATE DATABASE bamazon;
-- use this database
USE bamazon;

-- create table with columns
CREATE TABLE products(
    item_id VARCHAR(30) UNIQUE,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price DECIMAL(10,4) NOT NULL default 0,
    stock_quantity INT NOT NULL default 0,
    product_sales DECIMAL(10,4) NOT NULL default 0,
    PRIMARY KEY (item_id)
);

-- update table with data
INSERT INTO products( item_id, product_name, department_name, price, stock_quantity) 
VALUES ( "A001", "Basmati Rice", "Food", 5.25, 20 ), ("A002", "Glueten Free Pizza", "Food", 8.00, 25 ), ( "A003", "Organic Chicken", "Food", 6.75, 15);

INSERT INTO products( item_id, product_name, department_name, price, stock_quantity)
VALUES ( "B001", "Coca Cola", "Beverage", 3.10, 40 ), ( "B002", "Coors Light", "Beverage", 10.50, 55), ( "B003", "Bacardi Rum", "Beverage", 15.99, 45), ( "B004", "StarBucks Cold Brew", "Beverage", 7.49, 30);

INSERT INTO products( item_id, product_name, department_name, price, stock_quantity)
VALUES ("C001", "Clorex", "Supply", 17.69, 35), ("C002", "Swifter Liquid", "Supply", 14.29, 30);
