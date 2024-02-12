let addATask = document.getElementById("addATask");
let toDoCount = document.getElementById("toDoCount"); 
let inProgressCount = document.getElementById("inProgressCount"); 
let doneCount = document.getElementById("doneCount"); 
let taskDiv = document.getElementById("taskDiv");
let list1 = document.getElementById("list1"); 
let list2 = document.getElementById("list2"); 
let taskName = document.getElementById("taskName"); 
let taskDesc = document.getElementById("taskDesc"); 
let taskDate = document.getElementById("taskDate"); 
let makeTask = document.getElementById("makeTask"); 

document.addEventListener("DOMContentLoaded", function() {
    makeTask.addEventListener("click", function() {
        let taskNameValue = taskName.value;
        let taskDescValue = taskDesc.value;
        let taskDateValue = taskDate.value;
        let priorityValue = list1.value;
        let statusValue = list2.options[list2.selectedIndex].text;
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
                    return;
            }
            statusSpan.textContent = newStatus;
            updateCount(currentStatus, false);
            updateCount(newStatus, true);
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
        let currentCount = parseInt(countElement.textContent);
        countElement.textContent = increment ? currentCount + 1 : currentCount - 1;
    }
});
