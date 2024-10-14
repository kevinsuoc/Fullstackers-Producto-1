// INTERFAZ 3: Drag & Drop de tareas entre columnas

// Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event

// HTML DOM Element
let dragged = null;

// ondragstart event listener: sets dragged if a "task" is being drag
ondragstart = (event) => {  
    if (event.target.classList.contains("task"))
        dragged = event.target;
    else
        dragged = null;
};

// ondragover event listener. If not present, the browser will default to doing nothing
ondragover = (event) => {
    event.preventDefault();
};

// ondrop event listener.
ondrop = (event) => {
    // Necessary to override browser default
    event.preventDefault();

    // DOM element variable
    let dropTarget = event.target;

    // Searchs the tree upwards until it finds a "task" or tasks column, "tasks".
    while (dropTarget && !(dropTarget.classList.contains("tasks") || dropTarget.classList.contains("task"))) {
        dropTarget = dropTarget.parentNode;
    }

    // If not found or it's the dragged element, exits
    if (!dropTarget || dropTarget === dragged) {
        return ;
    }

    // Remove from source and append above a task or at the end of the task list
    if (dropTarget.classList.contains("tasks")) {
        dragged.parentNode.removeChild(dragged);
        dropTarget.appendChild(dragged);
    } else if (dropTarget.classList.contains("task")) {
        dragged.parentNode.removeChild(dragged);
        dropTarget.insertAdjacentElement("beforebegin", dragged);
    }
    
    dragged = null;
};

// INTERFAZ 3: Modificación dinámica de subelementos
// Esta variable almacenará la tarea a editar
let taskToEdit = '';

function editTask(taskId) {
    taskToEdit = taskId; // Guardamos el ID de la tarea a editar
    const taskElement = document.getElementById(taskId);
    
    // Rellenar el modal con los datos de la tarea
    document.getElementById('editTaskTitle').value = taskElement.querySelector('h5').innerText;
    document.getElementById('editTaskDescription').value = taskElement.querySelector('p').innerText;
    document.getElementById('editTaskDueDate').value = taskElement.querySelectorAll('p')[1].innerText.split(': ')[1];
    document.getElementById('editTaskAssignee').value = taskElement.querySelectorAll('p')[2].innerText.split(': ')[1];
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    modal.show();
}

// Evento para manejar la edición de la tarea
document.getElementById('editTaskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir envío por defecto
    
    const taskElement = document.getElementById(taskToEdit);
    if (taskElement) {
        // Actualizar los valores de la tarea
        taskElement.querySelector('h5').innerText = document.getElementById('editTaskTitle').value;
        taskElement.querySelector('p').innerText = document.getElementById('editTaskDescription').value;
        taskElement.querySelectorAll('p')[1].innerText = `Fecha límite: ${document.getElementById('editTaskDueDate').value}`;
        taskElement.querySelectorAll('p')[2].innerText = `Responsable: ${document.getElementById('editTaskAssignee').value}`;
    }

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
    modal.hide();
});
