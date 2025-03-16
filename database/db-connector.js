// Citations for the following file
// Date: 03/15/2025
// All code is based on the CS340 starter code
// Title: CS 340 React Starter Guide
// Type: Source Code
// Author(s): Zac Maes, Devin Daniels, Michael Curry, Brianna Romrey
// Code Version: 41f83aa+
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_carlylet',
    password        : 'VqmUYO77B8f9',
    database        : 'cs340_carlylet'
})

// Export it for use in our applicaiton
module.exports.pool = pool;