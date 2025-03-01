// public/js/delete_property.js
function deleteProperty(propertyID) {
    // Create a data object with the property ID
    let data = {
        id: propertyID
    };
    // Make an AJAX request to delete the property
    $.ajax({
        url: '/delete-property-ajax',
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            // If successful, remove the row from the table
            deleteRow(propertyID);
        },
        error: function(xhr, status, error) {
            // Log any errors to the console
            console.log("Error deleting property: ", error);
        }
    });
}
function deleteRow(propertyID) {
    // Get the properties table
    let table = document.getElementById("properties-table");
    // Iterate over the rows to find the one with the matching property ID
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == propertyID) {
            // Delete the row from the table
            table.deleteRow(i);
            break;
        }
    }
}