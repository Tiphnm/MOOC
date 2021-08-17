var mysql = require('mysql');
var dotenv = require('dotenv').config()


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_MDP,
  multipleStatements: true 
});


con.query("CREATE DATABASE IF NOT EXISTS Mooc", function (err, result) 
{
  if (err) throw err;
  console.log("Database created");
}); 

var table_user = "use Mooc ; CREATE TABLE IF NOT EXISTS users (id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT, user_name varchar(50), user_email varchar(50), user_password varchar(50), super_user boolean);";
var table_tutorial = " use Mooc ; CREATE TABLE IF NOT EXISTS tutorial (id_tutorial INT PRIMARY KEY NOT NULL AUTO_INCREMENT, id_user INT, datetime DATE, average_grade INT, FOREIGN KEY (id_user) REFERENCES users(id_user));";
var table_tutorial_content = "use Mooc ; CREATE TABLE IF NOT EXISTS tutorial_content (id_tutorial INT, description varchar (100), FOREIGN KEY(id_tutorial) REFERENCES tutorial(id_tutorial));"
var table_comment = "use Mooc ; CREATE TABLE IF NOT EXISTS comments (id_comment INT PRIMARY KEY NOT NULL AUTO_INCREMENT, id_tutorial INT, id_user INT, comment varchar(400), datetime DATE, grade INT, FOREIGN KEY(id_tutorial) REFERENCES tutorial(id_tutorial), FOREIGN KEY (id_user) REFERENCES users(id_user)); "

function create_Table(my_table){
  con.query(my_table, function (err, result) 
  {
    if (err) throw err;
    console.log("Tables is successfully created.");
  });
}

create_Table(table_user); 
create_Table(table_tutorial); 
create_Table(table_tutorial_content); 
create_Table(table_comment);

con.end(); 
