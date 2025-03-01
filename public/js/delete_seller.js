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