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
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " +
        res[i].stock_quantity)}
        console.log("-----------------------------------");
      //connection.end();
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
      console.log("prodID ", prodID)

      connection.query("SELECT stock_quantity FROM products where item_id = " + prodID, function(err, res) {
          if (err) {console.log(err)}
          else {
              var stockQuantity = res[0].stock_quantity};
              console.log("stockQuantity ", stockQuantity)
              if (stockQuantity > prodAmount) {
                  var newAmount = (stockQuantity - prodAmount)
                  updateStock(newAmount);
              } else {console.log("Not enough")}
      });

      function updateStock(newAmount) {
        connection.query("UPDATE products SET ? WHERE ?",
                          [
                            {
                              stock_quantity: newAmount
                            },
                            {
                              item_id: prodID
                            }
                          ])
        };
        //connection.end();
    }) }// End of function Productid()

    

//     function quantityAmount(prodID) {
//   inquirer
//   .prompt([
//       {
//         type: "input",
//         message: "How many of those products do you want?",
//         name: "productamount"
//     }
//     ])
//     .then(function(answer1) {
//         var prodID = answer1.productid; 
//         var productOrdered = answer1.productamount;
        
//         var productAvailable = connection.query("SELECT stock_quantity FROM products where id = " + userChoice, function(err, res) {
//             console.log(res);
//         if (productOrdered > res) {
//             console.log("not enough!")
//         } else {
//             var newStockQuantity = (productAvailable - productOrdered);
//             connection.query("UPDATE products SET ? WHERE ?",
//                   [
//                     {
//                       stock_quantity: newStockQuantity
//                     },
//                     {
//                       item_id: userChoice
//                     }
//                   ])
//         }
//         })

//       });
//     }}