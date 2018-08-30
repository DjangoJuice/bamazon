var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {console.log(err)}
  else {
  displayProducts();
  }
  console.log("connected as id " + connection.threadId);
});

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) {
        console.log(err)
      } else {
      for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " +
        res[i].stock_quantity)}}
        console.log("-----------------------------------");
      productid();
    });
  };

  function productid() {
  inquirer
  .prompt([
    {
        type: "input",
        message: "Which product ID would you like to buy?",
        name: "productid"
      },
      {
        type: "input",
        message: "How many of those products do you want?",
        name: "productamount"
    }
    ])
    .then(function(answer) {
      var prodID = answer.productid;
      var prodAmount = answer.productamount;

      connection.query("SELECT stock_quantity FROM products where item_id = " + prodID, function(err, res) {
          if (err) {console.log(err)}
            else {
              var stockQuantity = res[0].stock_quantity
            };
              console.log("stockQuantity ", stockQuantity)
              if (stockQuantity > prodAmount) {
                var newAmount = (stockQuantity - prodAmount)
                  updateStock(prodId, newAmount);
              } else {console.log("Not enough")}
            })
          })
        };

function updateStock(prodId, newAmount) {
  return callback(prodId, newAmount);
};

function callback(prodId, newAmount) {
    connection.query(
      "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newAmount
          },
          {
            item_id: prodId
          }
        ]
      )
    };