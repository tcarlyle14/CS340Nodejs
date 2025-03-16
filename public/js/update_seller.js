// Citations for the following file
// Date: 03/15/2025
// All code is based on the CS340 starter code
// Title: CS 340 React Starter Guide
// Type: Source Code
// Author(s): Zac Maes, Devin Daniels, Michael Curry, Brianna Romrey
// Code Version: 41f83aa+
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Get the update seller form element
let updateSellerForm = document.getElementById('update-seller-form-ajax');
// Add an event listener to the form's submit event
updateSellerForm.addEventListener("submit", function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Get the input elements for seller, phone, and email
    let inputSeller = document.getElementById("sellerSelect");
    let inputPhone = document.getElementById("input-phone-update");
    let inputEmail = document.getElementById("input-email-update");
    // Get the values of the input elements
    let sellerID = inputSeller.value;
    let phoneValue = inputPhone.value;
    let emailValue = inputEmail.value;
    // Create a data object to send with the request
    let data = {
        sellerID: sellerID,
        phone: phoneValue,
        email: emailValue
    };
    // Create a new XMLHttpRequest object
    var xhttp = new XMLHttpRequest();
    // Open a PUT request to the server to update the seller
    xhttp.open("PUT", "/update-seller-ajax", true);
    // Set the Content-type header to application/json
    xhttp.setRequestHeader("Content-type", "application/json");
    // Define a callback function to handle the response from the server
    xhttp.onreadystatechange = () => {
        // Check if the request is complete and successful
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Reload the page to reflect the changes
            location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            // Log an error message and display an alert to the user
            console.log("There was an error with the input.");
            alert("Failed to update seller. Please try again.");
        }
    };
    // Send the request to the server with the JSON data
    xhttp.send(JSON.stringify(data));
});