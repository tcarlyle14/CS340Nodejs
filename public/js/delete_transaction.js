// Citations for the following file
// Date: 03/15/2025
// All code is based on the CS340 starter code
// Title: CS 340 React Starter Guide
// Type: Source Code
// Author(s): Zac Maes, Devin Daniels, Michael Curry, Brianna Romrey
// Code Version: 41f83aa+
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Deletes a transaction by sending a DELETE request to the server.
function deleteTransaction(transactionID) {
    let data = {
        id: transactionID
    };
    $.ajax({
        url: '/delete-transaction-ajax',
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(transactionID);
        }
    });
}

// Deletes a row from the transactions table based on the transaction ID.
function deleteRow(transactionID) {
    let table = document.getElementById("transactions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == transactionID) {
            table.deleteRow(i);
            break;
        }
    }
}