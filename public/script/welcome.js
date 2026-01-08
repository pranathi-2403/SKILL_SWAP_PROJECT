// element variables
const signInModal = document.getElementById('signin-modal');
const signInButton = document.getElementById('btn');
const signinForm = document.getElementById('signinForm');
const alertDiv = document.getElementById('alert');

// display signin dialog box 
signInButton.onclick = () => {
    signInModal.style.display = 'flex';
};

// hide signin dialog box on clicking the background
signInModal.onclick = (event) => {
    if (event.target === signInModal) {
        signInModal.style.display = 'none';
    }
};

// slideshow variable 
let slideIndex = 0;

// function to show slides 
function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Hide all slides
    Array.from(slides).forEach(slide => slide.style.display = "none");

    // Remove 'active' class from dots
    Array.from(dots).forEach(dot => dot.className = dot.className.replace(" active", ""));

    // Increment slide index
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    // Show current slide and highlight corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Repeat every 5 seconds
    setTimeout(showSlides, 5000);
}

// Start slideshow
showSlides();

signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
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