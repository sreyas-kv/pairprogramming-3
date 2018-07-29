const PAIR_PROGRAMMING_URL = '/auth/github';
const PAIR_PROGRAMMING_WELCOME = 'http://localhost:8080/welcome';

//Navigate to Github login
//$('.submit').on('click', function() { window.location = 'http://localhost:8080/authenticate' });




//************************* Github Login API call ***************************/
// const GITHUB_LOGIN_URL = '/login';

// function authenticateUser() {
//     console.log('Getting Access');
//     $.getJSON(GITHUB_LOGIN_URL, function(items) {
//         console.log('Rendering shopping list');
//         var itemElements = items.map(function(item) {
//             var element = $(shoppingItemTemplate);
//             element.attr('id', item.id);
//             var itemName = element.find('.js-shopping-item-name');
//             itemName.text(item.name);
//             element.attr('data-checked', item.checked);
//             if (item.checked) {
//                 itemName.addClass('shopping-item__checked');
//             }
//             return element
//         });
//         $('.js-shopping-list').html(itemElements);
//     });
// }

//******************* Get Github authenticated user details ***********/
//const GITHUB_USER_URL = "/user";