// Get the objects we need to modify
let updateTransactionForm = document.getElementById('update-transaction-form-ajax');
// Modify the objects we need
updateTransactionForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputTransaction = document.getElementById("transactionSelect");
    let inputCommissionPercent = document.getElementById("input-commission-percent-update");
    let inputCommissionAmount = document.getElementById("input-commission-amount-update");
    let inputTransactionDate = document.getElementById("input-transaction-date-update");
    let inputPropertyID = document.getElementById("input-property-id-update");
    let inputSellerID = document.getElementById("input-seller-id-update");
    let inputAgentID = document.getElementById("input-agent-id-update");
    let inputSalePrice = document.getElementById("input-sale-price-update");
    // Get the values from the form fields
    let transactionID = inputTransaction.value;
    let commissionPercentValue = inputCommissionPercent.value;
    let commissionAmountValue = inputCommissionAmount.value;
    let transactionDateValue = inputTransactionDate.value;
    let propertyIDValue = inputPropertyID.value;
    let sellerIDValue = inputSellerID.value;
    let agentIDValue = inputAgentID.value;
    let salePriceValue = inputSalePrice.value;
    // Put our data we want to send in a JavaScript object
    let data = {
        transactionID: transactionID,
        commissionPercent: commissionPercentValue,
        commissionAmount: commissionAmountValue,
        transactionDate: transactionDateValue,
        propertyID: propertyIDValue,
        sellerID: sellerIDValue,
        agentID: agentIDValue,
        salePrice: salePriceValue
    };
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-transaction-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, transactionID);
            // Refresh the page
            location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});
function updateRow(data, transactionID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("transactions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == transactionID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            // Update the table cells with new data
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData.commissionPercent;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData.commissionAmount;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData.transactionDate;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData.propertyAddress;
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = parsedData.sellerName;
            updateRowIndex.getElementsByTagName("td")[6].innerHTML = parsedData.agentName;
            updateRowIndex.getElementsByTagName("td")[7].innerHTML = parsedData.salePrice;
        }
    }
}