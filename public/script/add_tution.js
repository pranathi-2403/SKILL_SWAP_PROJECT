const form = document.getElementById('tutionForm') // form variable
const a1 = document.getElementById("me"); // submit button variable
const alertPop = document.getElementById('alert') // alert div variable

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
alertPop.addEventListener('click',(event)=>{
    if(alertPop.style.display=='block'){
        alertPop.style.display='none';
    }
})

// event listener for submit button 
a1.onclick = async (event) => {
    event.preventDefault();
    let an = confirm("you sure you want to add tution"); // confirm adding of tuition

    // if confirm 
    if (an) {
        // get data inside form 
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // post the data 
            const response = await fetch(form.action, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            // check if response was ok 
            if (response.ok) {
                // check if post was successful
                if (result.success) {
                    // add class timings as the skill was added successfully
                    const classResponse = await fetch('/class', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            startTime: data.startTime,
                            endTime: data.endTime,
                            date: data.date,
                            skillId: result.skillId
                        }),
                    });
                    const classResult = await classResponse.json();

                    // check if class timings was added successfully
                    if (classResponse.ok) {
                        if (classResult.success) {
                            // redirect to tutions page 
                            window.location.href = result.redirect;
                        } else {
                            // display alert as class addition was unsuccessful 
                            displayAlert(classResult.message,'success','error');

                            // delete the skill as class timings could not be added 
                            fetch(`/skill/${result.skillId}`, { method: "DELETE" })
                                .then(response => {
                                    if (!response.ok) {
                                        console.log('skill exists');
                                    }
                                    return response.json();
                                }
                                ).then(data => {
                                    if (data.success) {
                                        console.log('skill not added');
                                    } else {
                                        console.log('skill is present');
                                    }
                                })
                                .catch(err => {
                                    console.log('error occured' + err);
                                })

                        }
                    } else {
                        // display alert as post class timings was unsuccessful 
                        displayAlert(classResult.message,'success','error');

                        // delete skill that was just added 
                        fetch(`/skill/${result.skillId}`, { method: "DELETE" })
                            .then(response => {
                                if (!response.ok) {
                                    console.log('skill exists');
                                }
                                return response.json();
                            }
                            ).then(data => {
                                if (data.success) {
                                    console.log('skill not added');
                                } else {
                                    console.log('skill is present');
                                }
                            })

                    }

                } else {
                    // addition of tution was unsuccessful 
                    alertPop.textContent = result.message;
                    displayAlert(result.message,'success','error');
                }
            } else {
                // skill addition response was not ok 
                displayAlert(result.message,'success','error');
            }
        } catch (error) {
            // an error occured 
            displayAlert('Something went wrong','success','error');
            console.log(error);
        }
    }
};

// to prevent selection of previous dates in class date 
const dates=document.getElementsByClassName("date")[0];
const today = new Date().toISOString().split('T')[0];
dates.setAttribute("min",today);