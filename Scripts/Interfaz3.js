// INTERFAZ 3: Drag & Drop de tareas entre columnas
function allowDrop(ev) {
    ev.preventDefault(); // Permitir soltar
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); // Almacenar el ID del elemento arrastrado
}

function drop(ev) {
    ev.preventDefault(); // Prevenir el comportamiento por defecto
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    ev.target.appendChild(draggedElement); // Agregar el elemento arrastrado al nuevo contenedor
}

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


let columnToRename = '';

function openRenameModal(columnId) {
    columnToRename = columnId; // Almacenar la columna que se va a renombrar
    const modal = new bootstrap.Modal(document.getElementById('renameColumnModal'));
    modal.show();
}

document.getElementById('confirmRenameButton').addEventListener('click', function() {
    const newColumnName = document.getElementById('newColumnName').value;
    const columnElement = document.getElementById(columnToRename);
    if (columnElement && newColumnName) {
        columnElement.querySelector('h5').childNodes[0].nodeValue = newColumnName; // Cambiar el nombre de la columna
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('renameColumnModal'));
    modal.hide();
});
