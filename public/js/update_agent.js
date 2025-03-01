// public/js/update_agent.js
// Get the objects we need to modify
let updateAgentForm = document.getElementById('update-agent-form-ajax');
// Modify the objects we need
updateAgentForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputAgent = document.getElementById("agentSelect");
    let inputPhone = document.getElementById("input-phone-update");
    let inputTerritory = document.getElementById("input-territory-update");
    let inputHireDate = document.getElementById("input-hiredate-update");
    // Get the values from the form fields
    let agentID = inputAgent.value;
    let phoneValue = inputPhone.value;
    let territoryValue = inputTerritory.value;
    let hireDateValue = inputHireDate.value;
    // Put our data we want to send in a JavaScript object
    let data = {
        agentID: agentID,
        phone: phoneValue,
        territory: territoryValue,
        hireDate: hireDateValue
    };
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-agent-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, agentID);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});
function updateRow(data, agentID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("agents-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == agentID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            // Update the table cells with new data
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData.phone;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData.territory;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData.hireDate;
        }
    }
}