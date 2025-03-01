// Get the form element we need to modify
let updateAgentPropertyForm = document.getElementById('update-agent-property-form-ajax');
// Add an event listener to handle form submission
updateAgentPropertyForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting the traditional way
    e.preventDefault();
    // Get form fields we need to get data from
    let inputJunction = document.getElementById("junctionSelect");
    let inputPropertyID = document.getElementById("input-property-id-update");
    let inputAgentID = document.getElementById("input-agent-id-update");
    // Get the values from the form fields
    let junctionID = inputJunction.value;
    let propertyIDValue = inputPropertyID.value;
    let agentIDValue = inputAgentID.value;
    // Get the selected property address and agent name for display
    let propertyAddress = inputPropertyID.options[inputPropertyID.selectedIndex].text;
    let agentName = inputAgentID.options[inputAgentID.selectedIndex].text;
    // Put our data we want to send in a JavaScript object
    let data = {
        junctionID: junctionID,
        propertyID: propertyIDValue,
        agentID: agentIDValue
    };
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-agent-property-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(junctionID, propertyAddress, agentName);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});
// Function to update the row in the table
function updateRow(junctionID, propertyAddress, agentName) {
    let table = document.getElementById("agent-property-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == junctionID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            // Update the table cells with new data
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = propertyAddress;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = agentName;
        }
    }
}