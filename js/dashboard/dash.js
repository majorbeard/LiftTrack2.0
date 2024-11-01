//HAMBURGER MENU
const hamburger = document.getElementById('hamburger');

//NAVBAR MENU
const navbar = document.getElementById('navbar');
    
//HAMBURGER MENU EVENT LISTENER
hamburger.addEventListener('click', function () {
    //Navbar menu
    navbar.classList.toggle('scale-x-100');
});    

//Close navbar menu
const closeNavMenu = document.getElementById('close-nav-menu');

//Close profile menu
const closeProfileMenu = document.getElementById('close-profile-menu');

//CLOSE MENU EVENT LISTENER
closeNavMenu.addEventListener('click', function () {
    navbar.classList.remove('scale-x-100');
});

//CLOSE MENU EVENT LISTENER
closeProfileMenu.addEventListener('click', function () {
    profile.classList.remove('scale-x-100');
});

//PROFILE ICON
const profileIcon = document.getElementById('profile-menu');

//PROFILE MENU
const profile = document.getElementById('profile');

//PROFILE MENU EVENT LISTENER
profileIcon.addEventListener('click', function () {
    profile.classList.toggle('scale-x-100');
});

//ARRAY CONTAINING OBJECTS OF USER DATA
const users = [
    {
        id: 1,
        userName: 'Thabo',
        email: 'thabo@example.com',
        userMessage: 'Let’s have a productive workout today!'
    },

    {
        id: 2,
        userName: 'Sarah',
        email: 'sarah@example.com',
        userMessage: 'Let’s have a productive workout today!'
    },

    {
        id: 3,
        userName: 'Lerato',
        email: 'lerato@example.com',
        userMessage: 'Let’s have a productive workout today!'
    },
]

//FUNCTION TO DISPLAY USER CONTENT FROM USERS ARRAY
const displayUserContent = function (userId) {

    //FIND THE USER OBJECT WITH THE SPECIFIED ID (in fuction placeholder)
    const user = users.find(user => user.id === userId)

    //UPDATE HTML IF THE USER IS FOUND
    if (user) {

        //ACCESS USER NAME / USER MESSAGE SPAN ELEMENT BY ITS ID (in html document)
        const userNameSpan = document.getElementById('userName');
        const userMessageSpan = document.getElementById('userMessage');

        //SET THE INNER TEXT OF THE SPAN TO THE USER'S USERNAME AND MESSAGE
        userNameSpan.innerText = user.userName;
        userMessageSpan.innerText = user.userMessage;
    } else {
        console.log('User not found')
    }
}

//CALL FUNCTION TO DISPLAY NAME FOR ID 1
displayUserContent(2);