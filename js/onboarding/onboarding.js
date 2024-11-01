document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const genderRadioSelection = document.querySelector('input[name="gender"]');
    genderError = document.querySelector('[data-error="gender"]')


    // Show error function
    function showError (input, errorInput, message) {
        genderError.textContent = message;
        genderRadioSelection.classList.remove('hidden');
        genderRadioSelection.classList.add('border-red-500')
    }

    showError(genderRadioSelection, genderError, 'Please select one of the options')
})