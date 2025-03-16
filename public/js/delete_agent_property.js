// Citations for the following file
// Date: 03/15/2025
// All code is based on the CS340 starter code
// Title: CS 340 React Starter Guide
// Type: Source Code
// Author(s): Zac Maes, Devin Daniels, Michael Curry, Brianna Romrey
// Code Version: 41f83aa+
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


// Deletes an agent property by sending a DELETE request to the server.
function deleteAgentProperty(junctionID) {
    let data = {
        id: junctionID
    };
    $.ajax({
        url: '/delete-agent-property-ajax',
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(junctionID);
        }
    });
}
// Deletes a row from the agent property table based on the junction ID.
function deleteRow(junctionID) {
    let table = document.getElementById("agent-property-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == junctionID) {
            table.deleteRow(i);
            break;
        }
    }
}