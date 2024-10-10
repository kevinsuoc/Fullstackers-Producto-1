// INTERFAZ 2: Validación y creación de tareas
const form = document.getElementById('taskForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir envío por defecto
    let isValid = true;

    // Validar título
    const title = document.getElementById('taskTitle');
    if (!title.value) {
        title.classList.add('is-invalid');
        isValid = false;
    } else {
        title.classList.remove('is-invalid');
    }

    // Validar descripción
    const description = document.getElementById('taskDescription');
    if (!description.value) {
        description.classList.add('is-invalid');
        isValid = false;
    } else {
        description.classList.remove('is-invalid');
    }

    // Validar fecha
    const dueDate = document.getElementById('taskDueDate');
    if (!dueDate.value) {
        dueDate.classList.add('is-invalid');
        isValid = false;
    } else {
        dueDate.classList.remove('is-invalid');
    }

    // Validar responsable
    const assignee = document.getElementById('taskAssignee');
    if (!assignee.value) {
        assignee.classList.add('is-invalid');
        isValid = false;
    } else {
        assignee.classList.remove('is-invalid');
    }

    // Si todo es válido, crear nueva tarea
    if (isValid) {
        const taskList = document.getElementById('column1'); // Agregar a la primera columna
        const newTask = document.createElement('div');
        newTask.className = 'task card p-2 mb-2';
        newTask.draggable = true;
        newTask.ondragstart = function(event) { drag(event); };
        newTask.id = `task${taskList.children.length + 1}`; // Asignar ID único

        newTask.innerHTML = `
            <h5>${title.value}</h5>
            <p>${description.value}</p>
            <p>Fecha límite: ${dueDate.value}</p>
            <p>Responsable: ${assignee.value}</p> <!-- Añadir el responsable -->
            <button onclick="confirmDelete('${newTask.id}')" class="btn btn-danger btn-sm">Eliminar</button>
            <button onclick="editTask('${newTask.id}')" class="btn btn-warning btn-sm">Editar</button>
        `;

        taskList.appendChild(newTask); // Agregar tarea a la columna

        // Reiniciar formulario
        title.value = '';
        description.value = '';
        dueDate.value = '';
        assignee.value = ''; // Reiniciar el campo de responsable

        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
        modal.hide();
    }
});
