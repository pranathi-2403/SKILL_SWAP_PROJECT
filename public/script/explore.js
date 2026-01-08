const signInModal = document.getElementById('signin-modal'); // sign in container
const signinForm = document.getElementById('signinForm'); // sign in form
const alertDiv = document.getElementById('alert'); //  alert pop up

signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // get form data 
    const formData = new FormData(signinForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(signinForm.action, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await response.json();

        if (response.ok) {
            if (result.success) {
                window.location.href = result.redirect;
            } else {
                signInModal.style.display = 'none';
                alertDiv.innerText = result.error;
                alertDiv.classList.add('error');
                alertDiv.style.display = 'block';

                console.log(result.error);
            }

        } else {
            signInModal.style.display = 'none';
            alertDiv.innerText = result.error;
            alertDiv.classList.add('error');
            alertDiv.style.display = 'block';
            console.log(result.error);
        }
    } catch (error) {
        console.log(error);
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".ski"); // get each category div    

    skills.forEach(skill => {
        const category = skill.querySelector("h3").innerText; // Get the category name

        // display sign in form when clicked on a category div 
        skill.addEventListener("click", () => {
            signInModal.style.display = 'flex';

        });
        // hide sign in when clicked on background 
        signInModal.onclick = (event) => {
            if (event.target === signInModal) {
                signInModal.style.display = 'none';
            }
        };
    });
});