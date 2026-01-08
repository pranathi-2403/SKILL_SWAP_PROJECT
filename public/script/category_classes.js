const insName = document.getElementById("insertName"); // element to display user name 
const alertPop = document.getElementById('alert'); // alert pop up
const container = document.querySelector(".toteach"); // get container to display the nearby classes

// get url parameters category name and id 
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const catId = urlParams.get('catId');

// function to display alert 
function displayAlert(message, removeClass, addClass) {
    alertPop.textContent = message;
    if (alertPop.classList.contains(removeClass)) {
        alertPop.classList.remove(removeClass);
    }
    alertPop.classList.add(addClass);
    alertPop.style.display = 'block';
}

// close alert when clicked on it 
alertPop.addEventListener('click', (event) => {
    if (alertPop.style.display == 'block') {
        alertPop.style.display = 'none';
    }
})

// function to display Hi user name 
async function insertName() {
    const responseName = await fetch('/getUser');
    const resultName = await responseName.json();

    if (responseName.ok) {
        insName.innerText = `Hi! ${resultName.userName}`;
    }
}

// function to get nearby tutions of a particular category 
async function gettution() {
    // fetch the tutions 
    const response = await fetch(`/skill/category/${catId}`);

    if (!response.ok) {
        // fetch unsuccessful return empty array 
        console.error("Can't find classes");
        return [];
    }
    const data = await response.json();
    if (data.success) {
        // fetch successful return the obtained tutions 
        return data.skills;

    }
    // else return empty array 
    return [];
}

// function to add event listeners to add skill buttons 
function attachListeners() {
    // get all the add skill buttons 
    document.querySelectorAll(".add").forEach(button => {
        // add event listener to button 
        button.addEventListener("click", async (event) => {

            const ans = confirm("are you sure u want to add tution");
            if (ans) {
                // get class id of the class to be added 
                classId = button.getAttribute('classId');
                try {
                    const response = await fetch(`/participant/${classId}`, { method: "POST" })
                    const result = await response.json();
                    if (result.success) {
                        displayAlert(result.message, 'error', 'success');
                        console.log("Tuition timing added.");
                    } else {
                        displayAlert(result.message, 'success', 'error');
                    }

                } catch (error) {
                    displayAlert('Something went wrong', 'success', 'error');
                    console.log(error);
                }


            }

        });
    });


}

// fuction to display nearby tutions 
async function gets() {
    const classes = await gettution(); // call function to get nearby classes

    // if classes array is not empty add the tutions into the container 
    if (classes.length > 0) {
        // get timings of the particular skills 
        let time = [];
        for (const element in classes) {
            const timings = await getTimings(classes[element].skill_id);
            time.push(timings);
        }

        // display each skill 
        classes.forEach((element, index) => {
            const d = Number(element.distance).toFixed(3);
            const skillDiv = document.createElement('div');
            skillDiv.classList.add("sub");
            skillDiv.innerHTML = `
                <h2>Skill Name: ${element.skill_name}</h2>
                <p>Teacher: ${element.user_name}</p>
                <p>Phone No.: ${element.phone}</p>
                <p>Address: ${element.address}</p>
                <p>Distance: ${d}km</p>
                <p>Description: ${element.description}</p>
                <div class="timings"></div>
            `;

            // prerequisites button 
            const pre = document.createElement("button");
            pre.innerText = 'Prerequisites';
            pre.classList.add('butu', 'pre');
            pre.addEventListener("click", async () => {
                await displayPrerequisites(element.skill_id, element.skill_name);
            });
            skillDiv.appendChild(pre);
            container.appendChild(skillDiv);

            // Add tuition timings dynamically for each skill
            const classTime = time[index];
            if (classTime.length > 0) {

                classTime.forEach(timeSlot => {
                    const timingDiv = document.createElement('div');
                    timingDiv.classList.add("times");
                    const date = new Date(timeSlot.date);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                    const day = String(date.getDate()).padStart(2, '0');
                    const onlyDate = `${year}-${month}-${day}`;

                    timingDiv.innerHTML = `
                    <p>Date: ${onlyDate}</p>
                    <p>Timings: ${timeSlot.start_time} - ${timeSlot.end_time}</p>
                    <div class="button-container">
                         <button class="but add" classId="${timeSlot.class_id}">Enroll</button>
                    </div>
                    `;
                    skillDiv.querySelector(".timings").appendChild(timingDiv);
                });
            }
        });
    } else {
        // display no nearby skills of the category found 
        document.getElementById("para").innerText = `NO TUTIONS, CLICK ON ADD TUTION TO ADD YOUR CLASSES`;
    }

    attachListeners();
}

// function to get timings of a skill 
async function getTimings(id) {
    const response = await fetch(`/skill/timings/${id}`)
    if (!response.ok) {
        console.error("Can't find classes");
        return [];
    }
    const data = await response.json();
    return data.classes;
}

const preHead = document.getElementById('preHead'); // heading of prerequisites
const premain = document.getElementById('premain'); // container to dynamically add prerequisites
const prereContainer = document.getElementById("prere"); // container of prerequisites

// event listener to close prerequisites container when clicked on background 
prereContainer.onclick = (event) => {
    if (event.target === prereContainer) {
        prereContainer.style.display = 'none';
    }
};

// function to display prerequisites of a skill 
async function displayPrerequisites(skillId, skillName) {
    const response = await fetch(`/prerequisite/${skillId}`);
    const result = await response.json();

    if (response.ok) {
        if (result.success) {
            const preDes = result.prerequisites;
            preHead.innerText = `SEE PREREQUISITES OF ${skillName.toUpperCase()}`
            premain.innerHTML = '';
            if (preDes.length === 0) {
                premain.innerText = result.message;
            } else {
                preDes.forEach(element => {
                    const box = document.createElement('div');
                    box.classList.add('presec');
                    const desc = document.createElement('p');
                    desc.innerText = element.description;
                    box.appendChild(desc);

                    premain.appendChild(box);
                })

            }
            prereContainer.style.display = 'flex';
        } else {
            displayAlert(result.message, 'success', 'error');
        }
    } else {
        displayAlert(result.message, 'success', 'error');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    insertName(); // call function to display name

    // display category name 
    const hh = document.getElementsByClassName("h2")[0];
    hh.innerText = `SEE NEAR BY CLASSES IN ${category} CATEGORY`;

    gets(); // call function
});

