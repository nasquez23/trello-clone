const toggleInputButtons = document.querySelectorAll('.toggle-input-btn');

toggleInputButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.display = "none";
        const sectionId = button.id.split("-")[0];
        const inputSection = document.getElementById(sectionId + "-input-section");
        inputSection.style.display = "flex";
        const closeBtn = document.getElementById(sectionId + "-close-btn");

        closeBtn.addEventListener('click', () => {
            button.style.display = "block";
            inputSection.style.display = "none";
        });
    });
});