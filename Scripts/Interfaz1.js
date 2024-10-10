// INTERFAZ 1: Eliminación de tareas
let taskToDelete = '';

function confirmDelete(taskId) {
    taskToDelete = taskId;
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show();
}

document.getElementById('confirmDeleteButton').addEventListener('click', function() {
    const taskElement = document.getElementById(taskToDelete);
    if (taskElement) {
        taskElement.remove(); // Eliminar la tarea del DOM
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
    modal.hide();
});
