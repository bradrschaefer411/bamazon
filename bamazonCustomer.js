var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kirby411',
  database: 'bamazon'
});

function start() {



  // connection.connect();

  connection.query('SELECT product_name, stock_quantity, item_id FROM bamazon.products', function (error, results, fields) {
    if (error) throw error;
    console.table(results);
  });
  // connection.end()


  inquirer.prompt([
    {
      type: 'input',
      name: 'item-id',
      // name: 'stock_quantity',
      message: 'What is the ID of the item you would like to purchase?',
      // message: 'What is the quantity of items you need?',
      validate: function (value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    }
  ])
    .then(answers => {
      console.log(answers)
      // connection.connect()
      connection.query(`
      SELECT product_name, stock_quantity, item_id 
      FROM bamazon.products 
      WHERE item_id=5;`, function (error, results) {
        // if (error) throw error;
        console.table(results);
      });
      // connection.end()
    })

  inquirer.prompt([
    {
      type: 'input',
      name: 'stock_quantity',
      message: 'What is the quantity of items you need?',
      // validate: function(value) {
      //   var valid = !isNaN(parseFloat(value));
      //   return valid || 'Please enter a number';
      // },
      filter: Number
    }
  ])
    .then(answers => {
      console.log('stock_quantity', answers)
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
    connection.end();
}

start();