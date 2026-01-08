// display user name 
fetch("/getUser")
    .then(response => {
        if (!response.ok) {
            throw new Error("Not logged in");
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('user-name').innerText = data.userName;
    })
    .catch(err => {
        console.error(err);
        document.getElementById("welcome-message").innerText = "Welcome, Guest!";
    });

// function to add Notification
async function gets() {
    let arr = await getnotify(); // get notifications for the current day 

    const teachNotify = arr.teach;
    const learnNotify = arr.learn;
    const container = document.getElementById('ma');

    if (teachNotify.length == 0 && learnNotify.length == 0) {
        // display no notifications
        document.getElementById("para").innerText = `YOU DO NOT HAVE ANY NOTIFICATIONS FOR TODAY`;
    } else {
        // display teaching notifications 
        if (teachNotify.length > 0) {
            teachNotify.forEach(element => {
                const not = document.createElement("div");
                not.classList.add('notify');
                not.innerText = `You need to teach ${element.skill_name} class at ${element.start_time} till ${element.end_time}`;
                container.appendChild(not);
            });

        }

        // display learning notifications 
        if (learnNotify.length > 0) {
            learnNotify.forEach(element => {
                const not = document.createElement("div");
                not.classList.add('notify');
                not.innerText = `You need to go to ${element.address} for a ${element.skill_name} class from ${element.start_time} to ${element.end_time}`;
                container.appendChild(not);
            });

        }

    }

}

// function to get Notification for this day 
async function getnotify() {
    const response = await fetch(`/notifications`);
    if (!response.ok) {
        console.error("Couldn't fetch user notifications");
        return [];
    }
    const data = await response.json();
    return data;
}


document.addEventListener("DOMContentLoaded", function () {
    gets();
});