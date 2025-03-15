// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 54829;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/
// app.js
//homepage
app.get('/', function(req, res) {
    res.render('home');
});
//agents
app.get('/agents', function(req, res)
    {  
        let query1 = "SELECT * FROM Agents;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('agents', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.post('/add-agent-form', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `
        INSERT INTO Agents (Name, Phone, Territory, HireDate) 
        VALUES ('${data['input-name']}', '${data['input-phone']}', '${data['input-territory']}', '${data['input-hiredate']}')
    `;
    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, we redirect back to our root route
            res.redirect('/agents');
        }
    });
});

app.delete('/delete-agent-ajax', function(req, res, next) {
    let data = req.body;
    let agentID = parseInt(data.id);
    let deleteAgentQuery = `DELETE FROM Agents WHERE AgentID = ?`;
    db.pool.query(deleteAgentQuery, [agentID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/update-agent-ajax', function(req, res, next) {
    let data = req.body;
    let agentID = parseInt(data.agentID);
    let phone = data.phone;
    let territory = data.territory;
    let hireDate = data.hireDate;
    let updateAgentQuery = `
        UPDATE Agents 
        SET Phone = ?, Territory = ?, HireDate = ? 
        WHERE AgentID = ?
    `;
    db.pool.query(updateAgentQuery, [phone, territory, hireDate, agentID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Send back the updated data to the client
            res.json({
                phone: phone,
                territory: territory,
                hireDate: hireDate
            });
        }
    });
});

app.get('/agent_property', function(req, res) {
    // Query to get agent-property relationships with property addresses and agent names
    let query1 = `
        SELECT ap.JunctionID, p.Address AS PropertyAddress, a.Name AS AgentName 
        FROM AgentPropertyJunction ap 
        JOIN Properties p ON ap.PropertyID = p.PropertyID 
        JOIN Agents a ON ap.AgentID = a.AgentID;
    `;
    // Query to get all properties
    let query2 = "SELECT PropertyID, Address FROM Properties;";
    // Query to get all agents
    let query3 = "SELECT AgentID, Name FROM Agents;";
    // Execute the first query
    db.pool.query(query1, function(error, agentPropertyRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            // Execute the second query
            db.pool.query(query2, function(error, propertyRows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    // Execute the third query
                    db.pool.query(query3, function(error, agentRows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(500);
                        } else {
                            // Render the template with the data
                            res.render('agent_property', {
                                data: agentPropertyRows,
                                properties: propertyRows,
                                agents: agentRows
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post('/add-agent-property-form', function(req, res) {
    let data = req.body;
    let query = `
        INSERT INTO AgentPropertyJunction (PropertyID, AgentID) 
        VALUES (?, ?)
    `;
    db.pool.query(query, [data['input-property-id'], data['input-agent-id']], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/agent_property');
        }
    });
});

app.delete('/delete-agent-property-ajax', function(req, res) {
    let data = req.body;
    let junctionID = parseInt(data.id);
    let query = `DELETE FROM AgentPropertyJunction WHERE JunctionID = ?`;
    db.pool.query(query, [junctionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/update-agent-property-ajax', function(req, res) {
    let data = req.body;
    let junctionID = parseInt(data.junctionID);
    let propertyID = data.propertyID;
    let agentID = data.agentID;
    let query = `
        UPDATE AgentPropertyJunction 
        SET PropertyID = ?, AgentID = ? 
        WHERE JunctionID = ?
    `;
    db.pool.query(query, [propertyID, agentID, junctionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json({
                propertyID: propertyID,
                agentID: agentID
            });
        }
    });
});

// View properties
app.get('/properties', function(req, res) {
    let queryProperties = "SELECT * FROM Properties;";
    let querySellers = "SELECT SellerID, Name FROM Sellers;"; // Fetch seller IDs and names
    db.pool.query(queryProperties, function(error, propertyRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            db.pool.query(querySellers, function(error, sellerRows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    res.render('properties', { 
                        data: propertyRows,
                        sellers: sellerRows // Pass seller data to the template
                    });
                }
            });
        }
    });
});

// Add a new property
app.post('/add-property-form', function(req, res) {
    let data = req.body;
    let sellerID = data['input-sellerid'] ? parseInt(data['input-sellerid']) : null; // Convert empty string to null
    let query = `
        INSERT INTO Properties (Address, City, County, SaleStatus, ListingPrice, SaleDate, SellerID) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.pool.query(query, [
        data['input-address'],
        data['input-city'],
        data['input-county'],
        data['input-salestatus'],
        parseFloat(data['input-listingprice']),
        data['input-saledate'] || null, // Handle optional SaleDate
        sellerID
    ], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/properties');
        }
    });
});

// Update a property
app.put('/update-property-ajax', function(req, res) {
    let data = req.body;
    let propertyID = parseInt(data.propertyID);
    let sellerID = data.sellerID ? parseInt(data.sellerID) : null; // Set to null if empty
    let saleDate = data.saleDate || null;
    let query = `
        UPDATE Properties 
        SET City = ?, County = ?, SaleStatus = ?, ListingPrice = ?, SaleDate = ?, SellerID = ? 
        WHERE PropertyID = ?
    `;
    db.pool.query(query, [data.city, data.county, data.saleStatus, parseFloat(data.listingPrice), data.saleDate, sellerID, propertyID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json({
                city: data.city,
                county: data.county,
                saleStatus: data.saleStatus,
                listingPrice: data.listingPrice,
                saleDate: data.saleDate,
                sellerID: sellerID
            });
        }
    });
});

// Delete a property
app.delete('/delete-property-ajax', function(req, res) {
    let data = req.body;
    let propertyID = parseInt(data.id);
    let query = `DELETE FROM Properties WHERE PropertyID = ?`;
    db.pool.query(query, [propertyID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// View sellers
app.get('/sellers', function(req, res) {
    let query1 = "SELECT * FROM Sellers;"; // Query to get all sellers
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.render('sellers', { data: rows }); // Render the sellers page with the data
        }
    });
});
// Add a new seller
app.post('/add-seller-form', function(req, res) {
    let data = req.body;
    let query1 = `
        INSERT INTO Sellers (Name, Phone, Email) 
        VALUES (?, ?, ?)
    `;
    db.pool.query(query1, [data['input-name'], data['input-phone'], data['input-email']], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/sellers');
        }
    });
});
// Update a seller
app.put('/update-seller-ajax', function(req, res) {
    let data = req.body;
    let sellerID = parseInt(data.sellerID);
    let query1 = `
        UPDATE Sellers 
        SET Phone = ?, Email = ? 
        WHERE SellerID = ?
    `;
    db.pool.query(query1, [data.phone, data.email, sellerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json({
                phone: data.phone,
                email: data.email
            });
        }
    });
});
// Delete a seller
app.delete('/delete-seller-ajax', function(req, res) {
    let data = req.body;
    let sellerID = parseInt(data.id);
    let query1 = `DELETE FROM Sellers WHERE SellerID = ?`;
    db.pool.query(query1, [sellerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

// View all sale transactions
app.get('/transactions', function(req, res) {
    let queryTransactions = `
        SELECT st.TransactionID, st.CommissionPercent, st.CommissionAmount, st.TransactionDate, 
               st.SalePrice, p.Address AS PropertyAddress, s.Name AS SellerName, a.Name AS AgentName
        FROM SaleTransactions st
        JOIN Properties p ON st.PropertyID = p.PropertyID
        JOIN Sellers s ON st.SellerID = s.SellerID
        JOIN Agents a ON st.AgentID = a.AgentID;
    `;
    let queryProperties = "SELECT PropertyID, Address FROM Properties;";
    let querySellers = "SELECT SellerID, Name FROM Sellers;";
    let queryAgents = "SELECT AgentID, Name FROM Agents;";
    
    db.pool.query(queryTransactions, function(error, transactionRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            db.pool.query(queryProperties, function(error, propertyRows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    db.pool.query(querySellers, function(error, sellerRows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(500);
                        } else {
                            db.pool.query(queryAgents, function(error, agentRows, fields) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(500);
                                } else {
                                    res.render('transactions', {
                                        data: transactionRows,
                                        properties: propertyRows,
                                        sellers: sellerRows,
                                        agents: agentRows
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
// Add a new sale transaction
app.post('/add-transaction-form', function(req, res) {
    let data = req.body;
    let query = `
        INSERT INTO SaleTransactions (CommissionPercent, CommissionAmount, TransactionDate, PropertyID, SellerID, AgentID, SalePrice) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.pool.query(query, [
        parseFloat(data['input-commission-percent']),
        parseFloat(data['input-commission-amount']),
        data['input-transaction-date'],
        parseInt(data['input-property-id']),
        parseInt(data['input-seller-id']),
        parseInt(data['input-agent-id']),
        parseFloat(data['input-sale-price'])
    ], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/transactions');
        }
    });
});
// Update a sale transaction
app.put('/update-transaction-ajax', function(req, res) {
    let data = req.body;
    let transactionID = parseInt(data.transactionID);
    let query = `
        UPDATE SaleTransactions 
        SET CommissionPercent = ?, CommissionAmount = ?, TransactionDate = ?, PropertyID = ?, SellerID = ?, AgentID = ?, SalePrice = ? 
        WHERE TransactionID = ?
    `;
    db.pool.query(query, [
        parseFloat(data.commissionPercent),
        parseFloat(data.commissionAmount),
        data.transactionDate,
        parseInt(data.propertyID),
        parseInt(data.sellerID),
        parseInt(data.agentID),
        parseFloat(data.salePrice),
        transactionID
    ], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.json({
                commissionPercent: data.commissionPercent,
                commissionAmount: data.commissionAmount,
                transactionDate: data.transactionDate,
                propertyID: data.propertyID,
                sellerID: data.sellerID,
                agentID: data.agentID,
                salePrice: data.salePrice
            });
        }
    });
});
// Delete a sale transaction
app.delete('/delete-transaction-ajax', function(req, res) {
    let data = req.body;
    let transactionID = parseInt(data.id);
    let query = `DELETE FROM SaleTransactions WHERE TransactionID = ?`;
    db.pool.query(query, [transactionID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});