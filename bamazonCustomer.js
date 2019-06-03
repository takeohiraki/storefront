var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
var keys = require("./keys.js")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username / password
  user: keys.mysql.id,
  password: keys.mysql.secret,
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  showAll();
});




function showAll() {
  var query = "SELECT id, product_name, price FROM bamazonDB.products";
  connection.query(query, function(err, res) {

    if (err) {
        console.log('this sql command; ' +this.sql)
    }

    console.log("\nProducts for sale")
    for(var i = 0; i < res.length; i++) {
      console.log("id: " + res[i].id + " || product: " + res[i].product_name + " || price: " + res[i].price);
    }
    console.log("\n")
    runBuy();
  });
}



function runBuy() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "Type the ID of the product you would like to buy"
      },
      {
        name: "quantity",
        type: "input",
        message: "Type the quantity that you want to purchase",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      checkQuant(answer.product, answer.quantity);
    });
}



function checkQuant(id, quantDemanded) {
  var query = "SELECT stock_quantity, price FROM bamazonDB.products WHERE ?";
  connection.query(query, { id: id}, function(err, res) {

    quant_stock = res[0].stock_quantity;

    if (err) {
        console.log('this sql command; ' +this.sql)
    }

    if (quant_stock < quantDemanded) {
      console.log("I'm sorry, there is not enough of that product");
      runBuy();
    }
    else {
      console.log("order placed")
      new_quant = quant_stock - quantDemanded;
      console.log(res[0].price)
      order(id, new_quant, res[0].price);
    }
    
  });
}


function order(id, new_quant, price) {
  console.log("Creating order\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: new_quant
      },
      {
        id: id
      }
    ],
    function(err, res) {
      console.log("Your purchase cost: $" + price)
      runBuy();
    }
  );
  // logs the actual query being run
  console.log(query.sql);

}

