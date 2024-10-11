
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv'); 

// 
app.use(express.json());
app.use(cors());
dotenv.config(); 

const host_ = process.env.DB_HOST
const name_ = process.env.DB_NAME
const password_ = process.env.DB_PASSWORD
const user_ = process.env.DB_USER
// connection to the database 
const db = mysql.createConnection({
    host: host_,
    user: user_,
    password: password_,
    database: name_ 
});

// Check if there is a connection 
db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL");

    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 

// < YOUR code goes down here 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Data is a file found in the Views folder 

 // Question 1 goes here
app.get('/patients', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

   // Question 2 goes here
app.get('/providers', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT * FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

   // Question 3 goes here

app.get('/patientsFirst', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT patient_id, first_name FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

   // Question 4 goes here

app.get('/providersSpec', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT  provider_id, provider_specialty FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});


// Start the server 
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})
