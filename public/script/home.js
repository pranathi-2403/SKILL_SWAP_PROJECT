const logoutBtn = document.getElementById('logout'); // get logout button

document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".ski"); // get each category div

    skills.forEach(skill => {
        const category = skill.querySelector("h3").innerText; // Get the category name

        skill.addEventListener("click", () => {
            // Redirect to a new HTML file based on the category
            const hidden = skill.querySelector('.hidden');
            const cid = hidden.innerText;
            const formattedCategory = category.toUpperCase()
            window.location.href = `/views/view_category_classes.html?catId=${cid}&category=${formattedCategory}`; // Navigate to the corresponding HTML file
        });
    });

    // get heading to add name 
    const main_heading = document.getElementById("main_heading");
    const welcome_heading = document.getElementById("welcome_head");

    // fetch user name 
    fetch("/getUser")
        .then(response => {
            if (!response.ok) {
                throw new Error("Not logged in");
            }
            return response.json();
        })
        .then(data => {
            main_heading.innerText = `Welcome, ${data.userName}!`;
            welcome_heading.innerText = `Hello, ${data.userName}!`;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("welcome-message").innerText = "Welcome, Guest!";
        });
});

// event listener for logout button on clicking 
logoutBtn.onclick = async (event) => {
    try {
        const response = await fetch('/logout', { method: 'GET' })
        const result = await response.json()

        if (result.message) {
            console.log(result.message); // Successfully logged out
            // Redirect to the login page
            window.location.href = '/views';
        }
    } catch (err) { console.error('Error logging out:', err) };
}


