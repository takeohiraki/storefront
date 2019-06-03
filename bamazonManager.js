/*
* If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

*/






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
  managerOptions();
});

function managerOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View products for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View products for sale":
        showAll();
        break;

      case "View low inventory":
        showAll(5);
        break;

      case "Add to inventory":
        Inv();
        break;

      case "Add new product":
        createProduct();
        break;
          
      case "exit":
        connection.end();
        break;
      }
    });
}


function showAll(limit) {
  var query = "SELECT * FROM bamazonDB.products WHERE stock_quantity <= ?";
  limit = limit || 100000;
  console.log(limit)
  connection.query(query, [limit], function(err, res) {

    if (err) {
        console.log('this sql command; ' +this.sql)
    }

    console.log("\nProducts for sale")
    for(var i = 0; i < res.length; i++) {
      console.log("id: " + res[i].id + " || product: " + res[i].product_name + " || price: " + res[i].price + " || quantity: " + res[i].stock_quantity);
    }
    console.log("\n")
    managerOptions();
  });
}



function Inv() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Type the id of the product that you would like to add inventory to",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "addInventory",
        type: "input",
        message: "How much inventory would you like to add?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
        var query = "SELECT stock_quantity FROM bamazonDB.products WHERE ?";
        connection.query(query, { id: answer.id}, function(err, res) {
      
          quant_stock = res[0].stock_quantity;
      
          if (err) {
              console.log('this sql command; ' +this.sql)
          }
            var new_quant = quant_stock + parseInt(answer.addInventory,10);
            changeInv(answer.id, new_quant);
        });
    });
  }


    function changeInv(id, new_quant) {
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
          console.log("Updated")
          managerOptions();
        }
      );
      // logs the actual query being run
      console.log(query.sql);
    
    }


    function createProduct() {
      console.log("Inserting a new product...\n");


      inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "what is the name of the product?",
        },
        {
          name: "department",
          type: "input",
          message: "Which department is it in?",
        },
        {
          name: "price",
          type: "input",
          message: "What is the price of the product?",
        },
        {
          name: "stock_quantity",
          type: "input",
          message: "How much is in stock?",
        }
      ])
      .then(function(answer) {
        var query = "INSERT INTO products SET ?"
        
        connection.query(query, 
          {
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.stock_quantity
          },
          function(err, res) {
            if (err) throw err;
            console.log("Added product")
          }
        );
        
      });
    }
