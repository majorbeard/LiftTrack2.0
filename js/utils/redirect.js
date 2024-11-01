const developerMessageAccept = document.getElementById('developer-message-submit');

developerMessageAccept.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    const checkbox = document.getElementById('checkbox');
    if (checkbox.checked) {
        window.location.href = 'stats.html'; // Ensure this is the correct path
        console.log("Checkbox is checked");
    } else {
        alert("Please accept the message before continuing.");
    }
});
