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
function deleteRow(junctionID) {
    let table = document.getElementById("agent-property-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == junctionID) {
            table.deleteRow(i);
            break;
        }
    }
}