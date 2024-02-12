// Modal component for adding a new task
let addATask = document.getElementById("addATask");

// Counters for tasks in different states
let toDoCount = document.getElementById("toDoCount"); // Counter for "To Do" tasks
let inProgressCount = document.getElementById("inProgressCount"); // Counter for "In Progress" tasks
let doneCount = document.getElementById("doneCount"); // Counter for "Done" tasks

// The div container holding the task list
let taskDiv = document.getElementById("taskDiv");

// Dropdowns for selecting task priority and status
let list1 = document.getElementById("list1"); // Dropdown for selecting task priority
let list2 = document.getElementById("list2"); // Dropdown for selecting task status

// Input fields for adding a new task
let taskName = document.getElementById("taskName"); // Input for the task's name
let taskDesc = document.getElementById("taskDesc"); // Input for the task's description
let taskDate = document.getElementById("taskDate"); // Input for the task's due date

// Button for submitting the new task
let makeTask = document.getElementById("makeTask"); // Button to add the new task


document.addEventListener("DOMContentLoaded", function() {
    makeTask.addEventListener("click", function() {
        let taskNameValue = taskName.value;
        let taskDescValue = taskDesc.value;
        let taskDateValue = taskDate.value;
        let priorityValue = list1.value;
        let statusValue = list2.options[list2.selectedIndex].text; // Get the text, not the value

        
        let taskElement = document.createElement("div");
        taskElement.classList.add("task", "card");
        taskElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${taskNameValue}</h5>
                <p class="card-text">${taskDescValue}</p>
                <p>Due Date: ${taskDateValue}</p>
                <p>Priority: ${priorityValue}</p>
                <p class="status">Status: <span>${statusValue}</span></p>
                <button class="btn btn-primary advance-status">Advance Progress</button>
            </div>
        `;
        taskDiv.appendChild(taskElement);
        taskName.value = '';
        taskDesc.value = '';
        taskDate.value = '';
        list1.selectedIndex = 0;
        list2.selectedIndex = 0;
        updateCount(statusValue, true);

        // Advance status button logic
        taskElement.querySelector('.advance-status').addEventListener('click', function() {
            let statusSpan = taskElement.querySelector('.status span');
            let currentStatus = statusSpan.textContent;
            let newStatus;

            switch (currentStatus) {
                case 'To Do':
                    newStatus = 'In Progress';
                    break;
                case 'In Progress':
                    newStatus = 'Done';
                    break;
                case 'Done':
                    // Optional: Handle if needed, such as disabling the button
                    this.textContent = 'Completed';
                    this.disabled = true;
                    return; // Skip updating counts since it's completed
            }

            // Update the task's status
            statusSpan.textContent = newStatus;

            // Update counts
            updateCount(currentStatus, false); // Decrement current status count
            updateCount(newStatus, true); // Increment new status count
        });
    });

    function updateCount(status, increment) {
        let countElement;
        switch (status) {
            case 'To Do':
                countElement = toDoCount;
                break;
            case 'In Progress':
                countElement = inProgressCount;
                break;
            case 'Done':
                countElement = doneCount;
                break;
        }

        // Update the count based on increment or decrement
        let currentCount = parseInt(countElement.textContent);
        countElement.textContent = increment ? currentCount + 1 : currentCount - 1;
    }
});
