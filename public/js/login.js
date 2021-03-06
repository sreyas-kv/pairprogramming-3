const firstName = $('.first-name').val();
const lastName = $('.last-name').val();
const currentLocation = $('.location').val();
const githubUsername = $('.user-name').val();

const redirectUrl = '/hello'

//Navigate to Login page
$('.index-login').on('click', function() {
    $(location).attr("href", location + "login");
});
//Navigate back to homepage on cancel
$('.login-cancel').on('click', function() {
    window.history.back();
})

$(document).ready(function() {
    $('.signup-button').click(function() {
        const password = document.getElementsByClassName('signup-pwd').value;
        const confirmPassword = document.getElementsByClassName('confirm-pwd').value;
        if (confirmPassword != password) {
            alert("Invalid password");
        }
    })
})

//Making POST Ajax request sending credential to server
$('#login-button').on('click', loginUser);

function loginUser(event) {
    event.preventDefault();
    let errorCount = 0;
    $('#login-form input').each(function(index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {
        let loginInfo = {
            username: $('#login-username').val(),
            password: $('#login-pwd').val()
        }

        //AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSON.stringify(loginInfo),
            url: '/login',
            dataType: 'JSON',
            contentType: 'application/json',

            success: function(response) {
                const jwtToken = response;
                window.location.href = 'hello';
            },
            error: function(err) {
                alert('invalid username or password');
            }

        }).done(function(response) {
            // Check for successful (blank) response
            if (response.msg === 'Successfully loggedin') {
                $('#login-form fieldset input').val('');
            }
        });
    } else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }

}