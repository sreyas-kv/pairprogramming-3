//-------Displaying all the users----//
const url = '/hello';

//GET All the registered users 
function ajaxGet() {
    let myVal;
    $.ajax({
        type: "GET",
        url: "/userdetails",
        success: function(result) {
            myVal = result;
            for (let key in myVal) {
                const login = myVal[key].githubUsername;
                getGithubUser(login, renderUserDetails);
            }
            if (result.hasOwnProperty('username')) {}
        },
        error: function(e) {
            $(".sub-container").html("<strong>Error</strong>");
        }
    });
}

//API Call to Github using user name from ajaxGet function
function getGithubUser(userName, callback) {
    const GITHUB_URL = `https://api.github.com/users/${userName}`;
    $.getJSON(GITHUB_URL, callback);
}

function renderUserDetails(info) {
    const name = info.name;
    const location = info.location;
    const userName = info.login;
    const htmlUrl = info.html_url;
    const avatar = info.avatar_url;

    const htmlRender = `
        <div class = "profile profile-parent" >
        <div class="profile avtar-div avatar">
        <img src=${avatar}>
        </div>
        <div class="profile profile-div details">   
        <p>${name}</p>
        <p>${location}</p>
        <a href=${htmlUrl}>View ${userName}'s Github profile</a>
        </div>
        </div>
        `
    const outputElement = $('.github_users');
    outputElement.prop('hidden', false).append(htmlRender);
}

//---------------------------NOTES API----------------------------//

//GET request to Notes
function getNotes() {
    let noteVal;
    $.ajax({
        type: "GET",
        url: "/notes",
        success: function(result) {
            noteVal = result;
            for (let key in noteVal) {
                const notes = noteVal[key].notes;
                renderNotes(notes);
                if (notes.length === 0) {
                    $('#delete_notes').prop('disabled', true);
                } else {
                    $('#delete_notes').prop('enabled', true);
                }
            }
        },
        error: function(e) {
            $(".sub-container").html("<strong>Error</strong>");
        }
    });
}

//PUT request to notes
$('.notes-form').submit(function putNote() {
    const id = '5b6738225a9e45b19dbde684';
    // event.preventDefault();
    let errorCount = 0;
    $('#notes-form input').each(function(index, val) {
        if ($(this).val() === '') { errorCount++; }
    });
    if (errorCount === 0) {
        let addNote = {
            notes: $('#notes-text').val()
        }
        $.ajax({
            type: "PUT",
            url: `/notes/${id}`,
            data: JSON.stringify(addNote),
            contentType: 'application/json',
            success: function(notes) {},
            error: function(e) {
                $(".sub-container").html("<strong>Error</strong>");
            }
        });
    }
});

//Delete Notes
$('#delete_notes').submit(function deleteNote() {
    const id = '5b6738225a9e45b19dbde684';
    // event.preventDefault();
    $.ajax({
        type: "DELETE",
        url: `/notes/${id}`,
        success: function() {},
    });
});

//Rendering Notes API Call
function renderNotes(existingNotes) {
    const notes = existingNotes;
    const notesRender = `
    <div class="notes-parent">
    <p>${notes}</p>
    `
    const notesOutputEelement = $('.notes');
    notesOutputEelement.prop('hidden', false).append(notesRender);
}


$(ajaxGet);
$(getNotes);