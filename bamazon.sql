DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(225) NULL,
  department_name VARCHAR(225) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("usb_drive", "electronics", 9.99, 100)
  , ("pillow", "home", 24.99, 10)
  , ("binder", "office", 4.99, 20)
  , ("shirt", "apparel", 12.99, 50)
