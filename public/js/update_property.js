// public/js/update_property.js
document.getElementById('update-property-form-ajax').addEventListener('submit', function (e) {
    e.preventDefault();
    // Get form fields
    let propertySelect = document.getElementById('propertySelect');
    let city = document.getElementById('input-city-update').value;
    let county = document.getElementById('input-county-update').value;
    let saleStatus = document.getElementById('input-salestatus-update').value;
    let listingPrice = document.getElementById('input-listingprice-update').value;
    let saleDate = document.getElementById('input-saledate-update').value || null;
    const sellerID = document.getElementById('input-sellerid-update').value || null;
    // Get selected property ID
    let propertyID = propertySelect.value;
    // Prepare data
    let data = {
        propertyID: propertyID,
        city: city,
        county: county,
        saleStatus: saleStatus,
        listingPrice: listingPrice,
        saleDate: saleDate,
        sellerID: sellerID
    };
    // AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-property-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the table row
            updateRow(xhttp.responseText, propertyID);
            location.reload();
        } else if (xhttp.readyState == 4) {
            console.log("Error updating property.");
        }
    };
    xhttp.send(JSON.stringify(data));
});
function updateRow(data, propertyID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("properties-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == propertyID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData.city;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData.county;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData.saleStatus;
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = parsedData.listingPrice;
            updateRowIndex.getElementsByTagName("td")[6].innerHTML = parsedData.saleDate;
            updateRowIndex.getElementsByTagName("td")[7].innerHTML = data.sellerID ? data.sellerID : 'NULL';
        }
    }
}