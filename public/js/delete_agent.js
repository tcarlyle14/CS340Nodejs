// public/js/delete_agent.js
function deleteAgent(agentID) {
    let data = {
        id: agentID
    };
    $.ajax({
        url: '/delete-agent-ajax',
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            deleteRow(agentID);
        }
    });
}
function deleteRow(agentID) {
    let table = document.getElementById("agents-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == agentID) {
            table.deleteRow(i);
            break;
        }
    }
}