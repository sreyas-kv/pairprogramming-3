//Displaying all the users

const url = '/hello';

// DO GET All the registered users

function ajaxGet() {
    let myVal;
    $.ajax({
        type: "GET",
        url: "/userdetails",
        success: function(result) {
            console.log("Success: ", result);
            myVal = result;
            for (let key in myVal) {
                const login = myVal[key].githubUsername;
                // console.log('login: ', login);
                // const firstName = myVal[key].firstName;
                // const lastName = myVal[key].lastName;
                // const htmlDisplay = `
                //         <div class="col-3">
                //          <p>Name: ${firstName} ${lastName}</p>
                //          </div>
                //         `;
                // const outputElem = $('.user-container-1');
                // outputElem.prop('hidden', false).append(htmlDisplay);
                //Calling the function that calll github api passing user name 
                getGithubUser(login, renderUserDetails);
            }
        },
        error: function(e) {
            $("#user-container-1").html("<strong>Error</strong>");
            //Print error in html
            // console.log("ERROR: ", e);
        }

    });

}

//API Call to Github


function getGithubUser(userName, callback) {
    const GITHUB_URL = `https://api.github.com/users/${userName}`;
    $.getJSON(GITHUB_URL, callback);
}

function renderUserDetails(info) {
    console.log('info:: ', info);
    const name = info.login;
    const location = info.location;
    const userName = info.login;
    const htmlUrl = info.html_url;
    const avatar = info.avatar_url;

    console.log('user name:', userName);

    const htmlRender = `
        <div class = "profile-parent" >
        <div class="profile rofile-div avatar">
        <img src=${avatar}>
        </div>
        <div class="profile profile-div details">
        <p>${name}</p>
        <p>${location}</p>
        <a href=${htmlUrl}>View ${userName}'s Github profile</a>
        </div>
        </div>
        `
    const outputElement = $('.user-container-2');
    outputElement.prop('hidden', false).append(htmlRender);

    // return htmlRender;

}


$(ajaxGet);