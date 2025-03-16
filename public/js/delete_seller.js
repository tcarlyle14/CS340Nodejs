// Citations for the following file
// Date: 03/15/2025
// All code is based on the CS340 starter code
// Title: CS 340 React Starter Guide
// Type: Source Code
// Author(s): Zac Maes, Devin Daniels, Michael Curry, Brianna Romrey
// Code Version: 41f83aa+
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


// Deletes a seller by sending a DELETE request to the server.
function deleteSeller(sellerID) {
    let data = {
        id: sellerID
    };
    $.ajax({
        url: '/delete-seller-ajax',
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            location.reload();
        },
        error: function(xhr, status, error) {
            console.log("Error deleting seller:", error);
            alert("Failed to delete seller. Please try again.");
        }
    });
}