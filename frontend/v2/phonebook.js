$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: "https://s8s7v9caa4.execute-api.us-east-2.amazonaws.com/dev/phonebook",
        dataType: "json",
        success: function(data) {
            console.log(data);   
           //$('.greeting-id').append(data.id);
           //$('.greeting-content').append(data.content);
        }
    });
});
