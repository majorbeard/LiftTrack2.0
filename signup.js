document.addEventListener('DOMContentLoaded', function() {
    // Input Elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');
    const passwordInput = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const checkboxInput = document.getElementById('terms');

    // Form
    const form = document.getElementById('signup-form');
    const formSubmitButton = document.getElementById('signup-button');

    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const dobError = document.getElementById('dob-error');
    const passwordError = document.getElementById('password-error')
    const passwordConfirmError = document.getElementById('password-confirm-error');
    const checkboxError = document.getElementById('terms-error');
    const formSubmitError = document.getElementById('form-error');

    // Password validation elements
    const passwordLength = document.querySelector('[data-requirement="length"]');
    const passwordUppercase = document.querySelector('[data-requirement="uppercase"]');
    const passwordLowercase = document.querySelector('[data-requirement="lowercase"]');
    const passwordNumber = document.querySelector('[data-requirement="number"]');
    const passwordSpecial = document.querySelector('[data-requirement="special"]');

    // Password hide / show icons
    const togglePasswordShow = document.getElementById('show-password');
    const togglePasswordHide = document.getElementById('hide-password');

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to calculate min age (16)
    function calcAge (dob) {
        // Convert dob input to date object
        const userBirthDate = new Date(dob);

        // Get today's date
        const today = new Date();

        // Get initial age based on year difference
        let age = today.getFullYear() - userBirthDate.getFullYear();

        // Check if user birtday happened in current year
        const userBirthMonth = userBirthDate.getMonth();
        const userBirthDay = userBirthDate.getDay();

        // If today's date is before user birthday this year, subtrack 1 from age
        if(today.getMonth() < userBirthMonth || (today.getMonth === userBirthMonth && today.getDate() < userBirthDay)) {
            age--
        }
        
        // Return if age is more or less than 16
        return age >= 16;
    }

    // Function to update password requirements
    function updatePasswordRequirements (inputElement,isValid) {
        if (isValid) {
            inputElement.classList.add('text-green-500');
            inputElement.classList.remove('text-red-500');
        } else {
            inputElement.classList.remove('text-green-500');
            inputElement.classList.add('text-red-500');
        }
    }

    // Function to toggle password visibility
    function togglePasswordVisibility () {
        const isPasswordVisible = passwordInput.type === 'text';

        // Toggle input type
        passwordInput.type = isPasswordVisible ? 'password' : 'text';

        // Toggle password icons
        togglePasswordShow.classList.toggle('hidden', !isPasswordVisible);
        togglePasswordHide.classList.toggle('hidden', isPasswordVisible);
    }

    // Show / hide password
    togglePasswordShow.addEventListener('click', togglePasswordVisibility);
    togglePasswordHide.addEventListener('click', togglePasswordVisibility);

    // Base validation function with destructured objects
    function handleValidation ({
        inputElement,
        errorElement,
        message = 'This field is required', // Default message if none provided
        validationFunction = (value) => !!value.trim() // Default validation checks if field is not empty
    }) {
        // Function to show error
        const showError = () => {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            errorElement.classList.add('active');
            inputElement.classList.add('border-red-500');
            inputElement.classList.remove('border-green-500');
        }

        // Function to show success
        const showSuccess = () => {
            errorElement.textContent = '';
            errorElement.classList.add('hidden');
            errorElement.classList.remove('active');
            inputElement.classList.remove('border-red-500');
            inputElement.classList.add('border-green-500');
        }

        // function to execute validation and return results
        const validate = () => {
            // If valid input state
            if(validationFunction(inputElement.value)) {
                // Call success function and return true
                showSuccess()
                return true;
            } else {
                // Call error function and return false
                showError()
                return false;
            }
        }

        return { showError, showSuccess, validate };
    }

    // Input validations
    // Name input - conditions: name >= 2
    nameInput.addEventListener('input', () => {
        const {validate} = handleValidation({
            inputElement: nameInput,
            errorElement: nameError,
            message: 'Please enter at least 2 characters',
            validationFunction: (value) => value.trim().length >= 2
        })

        validate();
    })

    // Email input - conditions: Email regex
    emailInput.addEventListener('input', () => {
        const {validate} = handleValidation({
            inputElement: emailInput,
            errorElement: emailError,
            message: 'Please enter a valid email address',
            validationFunction: (value) => emailRegex.test(value.trim())
        })

        validate();
    })

    // Date of birth input - conditions: calcAge funcition (older than 16)
    dobInput.addEventListener('input', () => {
        const {validate} = handleValidation({
            inputElement: dobInput,
            errorElement: dobError,
            message: 'You must be at least 16 years old to sign up',
            validationFunction: (value) => calcAge(value)
        })

        validate();
    })

    // Password input - conditions: Uppercase, lowercase, number, special character, length > 8
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;

        // Check each password requirement
        updatePasswordRequirements(passwordLength, password.length >= 8);
        updatePasswordRequirements(passwordUppercase, /[A-Z]/.test(password));
        updatePasswordRequirements(passwordLowercase, /[a-z]/.test(password));
        updatePasswordRequirements(passwordNumber, /[0-9]/.test(password));
        updatePasswordRequirements(passwordSpecial, /[!@#$%^&*(),.?":{}|<>]/.test(password));

        const {validate} = handleValidation({
            inputElement: passwordInput,
            errorElement: passwordError,
            message: 'Password must meet all requirements',
            validationFunction: (value) =>
                value.length >= 8 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /[0-9]/.test(value) &&
                /[!@#$%^&*(),.?":{}|<>]/.test(value)
        })

        validate();
    })

    // Password confirmation input - Conditions: Match password
    passwordConfirm.addEventListener('input', () => {
        const {validate} = handleValidation({
            inputElement: passwordConfirm,
            errorElement: passwordConfirmError,
            message: 'Passwords do not match',
            validationFunction: (value) => passwordInput.value.trim() === value.trim()
        })

        validate();
    })

    // Checkbox confirmation input - Conditions: checked
    checkboxInput.addEventListener('input', () => {
        const {validate} = handleValidation({
            inputElement: checkboxInput,
            errorElement: checkboxError,
            message: 'Please confirm that you read and understand the terms and privacy policy',
            validationFunction: () => checkboxInput.checked
        })

        validate();
    })

    // Blur validations
    // Name input - conditions: name >= 2
    nameInput.addEventListener('blur', () => {
        const {validate} = handleValidation({
            inputElement: nameInput,
            errorElement: nameError,
            message: 'Please enter at least 2 characters',
            validationFunction: (value) => value.trim().length >= 2
        })

        validate();
    })

    // Email input - conditions: Email regex
    emailInput.addEventListener('blur', () => {
        const {validate} = handleValidation({
            inputElement: emailInput,
            errorElement: emailError,
            message: 'Please enter a valid email address',
            validationFunction: (value) => emailRegex.test(value.trim())
        })

        validate();
    })

    // Date of birth input - conditions: calcAge funcition (older than 16)
    dobInput.addEventListener('blur', () => {
        const {validate} = handleValidation({
            inputElement: dobInput,
            errorElement: dobError,
            message: 'You must be at least 16 years old to sign up',
            validationFunction: (value) => calcAge(value)
        })

        validate();
    })

    // Password input - conditions: Uppercase, lowercase, number, special character, length > 8
    passwordInput.addEventListener('blur', () => {
        const password = passwordInput.value;

        // Check each password requirement
        updatePasswordRequirements(passwordLength, password.length >= 8);
        updatePasswordRequirements(passwordUppercase, /[A-Z]/.test(password));
        updatePasswordRequirements(passwordLowercase, /[a-z]/.test(password));
        updatePasswordRequirements(passwordNumber, /[0-9]/.test(password));
        updatePasswordRequirements(passwordSpecial, /[!@#$%^&*(),.?":{}|<>]/.test(password));

        const {validate} = handleValidation({
            inputElement: passwordInput,
            errorElement: passwordError,
            message: 'Password must meet all requirements',
            validationFunction: (value) =>
                value.length >= 8 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /[0-9]/.test(value) &&
                /[!@#$%^&*(),.?":{}|<>]/.test(value)
        })

        validate();
    })

    // Password confirmation input - Conditions: Match password
    passwordConfirm.addEventListener('blur', () => {
        const {validate} = handleValidation({
            inputElement: passwordConfirm,
            errorElement: passwordConfirmError,
            message: 'Passwords do not match',
            validationFunction: (value) => passwordInput.value.trim() === value.trim()
        })

        validate();
    })

    // Checkbox confirmation input - Conditions: checked
    checkboxInput.addEventListener('blur', () => {
        const {validate} = handleValidation({
            inputElement: checkboxInput,
            errorElement: checkboxError,
            message: 'Please confirm that you read and understand the terms and privacy policy',
            validationFunction: () => checkboxInput.checked
        })

        validate();
    })

    // Form submission - conditions: ALL conditions must be met before submitting
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validate each input
        // Name
        const isNameValid = handleValidation({
            inputElement: nameInput,
            errorElement: nameError,
            message: 'Please enter at least 2 characters',
            validationFunction: (value) => value.trim().length >= 2
        }).validate();

        // Email
        const isEmailValid = handleValidation({
            inputElement: emailInput,
            errorElement: emailError,
            message: 'Please enter a valid email address',
            validationFunction: (value) => emailRegex.test(value)
        }).validate();

        //DOB
        const isDobValid = handleValidation ({
            inputElement: dobInput,
            errorElement: dobError,
            message: 'You must be at least 16 years old to sign up',
            validationFunction: (value) => calcAge(value)
        }).validate()

        // Password
        const isPasswordValid = handleValidation({
            inputElement: passwordInput,
            errorElement: passwordError,
            message: 'Password must meet all requirements',
            validationFunction: (value) =>
                value.length >= 8 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /[0-9]/.test(value) &&
                /[!@#$%^&*(),.?":{}|<>]/.test(value)
        }).validate();

        // Password confirmation
        const isPasswordConfirmValid = handleValidation({
            inputElement: passwordConfirm,
            errorElement: passwordConfirmError,
            message: 'Passwords do not match',
            validationFunction: (value) => passwordInput.value.trim() === value.trim()
        }).validate();

        // Checkbox
        const isCheckboxValid = handleValidation({
            inputElement: checkboxInput,
            errorElement: checkboxError,
            message: 'Please confirm that you read and understand the terms and privacy policy',
            validationFunction: () => checkboxInput.checked
        }).validate();

        // Check if all validations are true
        if (isNameValid && isEmailValid && isDobValid && isPasswordValid && isPasswordConfirmValid && isCheckboxValid) {
            console.log('Form is valid, submitting data...');
            formSubmitError.classList.add('hidden');
            formSubmitError.classList.remove('active');
        } else {
            console.log("Form is not valid, please correct errors.");
            formSubmitError.textContent = 'Please ensure all fields are completed correctly';
            formSubmitError.classList.remove('hidden');
            formSubmitError.classList.add('active');
        }
    })
});