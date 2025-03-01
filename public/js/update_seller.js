let updateSellerForm = document.getElementById('update-seller-form-ajax');
updateSellerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let inputSeller = document.getElementById("sellerSelect");
    let inputPhone = document.getElementById("input-phone-update");
    let inputEmail = document.getElementById("input-email-update");
    let sellerID = inputSeller.value;
    let phoneValue = inputPhone.value;
    let emailValue = inputEmail.value;
    let data = {
        sellerID: sellerID,
        phone: phoneValue,
        email: emailValue
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-seller-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
            alert("Failed to update seller. Please try again.");
        }
    };
    xhttp.send(JSON.stringify(data));
});