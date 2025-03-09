// public/js/delete_transactions.js
function deleteTransaction(transactionID) {
    let data = {
        id: transactionID
    };
    $.ajax({
        url: '/delete-transaction-ajax',
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(transactionID);
        }
    });
}
function deleteRow(transactionID) {
    let table = document.getElementById("transactions-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == transactionID) {
            table.deleteRow(i);
            break;
        }
    }
}