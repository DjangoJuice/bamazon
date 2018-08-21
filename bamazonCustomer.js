var mysql = require("mysql");
var inquirer = reguirer("inquirer");

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
      connection.end();
    });
  };

  
// function queryAllSongs() {
//     connection.query("SELECT * FROM songs", function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//       }
//       console.log("-----------------------------------");
//     });
//   }
  
//   function queryDanceSongs() {
//     var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//       }
//     });