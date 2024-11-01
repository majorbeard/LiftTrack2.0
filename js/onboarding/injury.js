// Generic function to handle radio toggle with animation
function setupRadioToggle(radioGroupName, targetDivId) {
    const yesRadio = document.querySelector(`input[name="${radioGroupName}"][value="yes"]`);
    const noRadio = document.querySelector(`input[name="${radioGroupName}"][value="no"]`);
    const targetDiv = document.getElementById(targetDivId);

    yesRadio.addEventListener('change', function() {
        if (this.checked) {
            // First remove hidden to make element visible
            targetDiv.classList.remove('hidden');
            // Then trigger animation in next frame
            requestAnimationFrame(() => {
                targetDiv.classList.add('scale-y-100', 'opacity-100');
            });
        }
    });

    noRadio.addEventListener('change', function() {
        if (this.checked) {
            // First remove the scale/opacity
            targetDiv.classList.remove('scale-y-100', 'opacity-100');
            // Wait for transition to finish before hiding
            setTimeout(() => {
                targetDiv.classList.add('hidden');
            }, 100); // Match this to your transition duration
        }
    });
}

// Use it for your injury section
setupRadioToggle('injury', 'injury-description');
setupRadioToggle('medical', 'medical-description');

const submitButton = document.querySelector('.next-btn-stats')
submitButton.addEventListener('click', () => {
    window.location.href = '/indexPages/goal.html';
})