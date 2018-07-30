//show signup form on clicking signup from home page
$('.index-signup').on('click', function() {
    //$.get("/signup");
    $(location).attr("href", location + "signup");
});

//Navigate back to homepage on cancel
$('#signup-cancel').on('click', function() {
    window.history.back();
})

//Making POST Ajax request sending user details to server
$('#signup-button').on('click', addUser);

function addUser(event) {
    event.preventDefault();
    let errorCount = 0;
    $('#signup-form input').each(function(index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {
        let userInfo = {
            firstName: $('#first-name').val(),
            lastName: $('#last-name').val(),
            location: $('#location').val(),
            githubUsername: $('#user-name').val(),
            password: $('#signup-pwd').val(),
            // confirmPassword: $('#confirm-pwd').val()
        }
        console.log(userInfo);

        //AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSON.stringify(userInfo),
            url: '/signup',
            dataType: 'JSON',
            contentType: 'application/json'
        }).done(function(response) {
            // Check for successful (blank) response
            if (response.msg === '') {
                console.log('signup success');
                // Clear the form inputs
                $('#signup-form fieldset input').val('');
                // Update the table
                populateTable();
            } else {
                // If something goes wrong, alert the error message that our service returned

                console.log(response.msg);
            }
        });
    } else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }

}