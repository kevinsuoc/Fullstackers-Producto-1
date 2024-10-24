let boardCount = 0;

// Función para manejar la creación de un nuevo tablero
document.getElementById('confirmCreateBoardButton').addEventListener('click', function() {
    const newBoardName = document.getElementById('newBoardName').value;
    if (newBoardName) {
        // Obtener los tableros existentes desde localStorage
        const boards = JSON.parse(localStorage.getItem('boards')) || {};
        boardCount = Object.keys(boards).length + 1; // Incrementar el contador de tableros

        // Crear un nuevo tablero
        boards[boardCount] = { 
            name: newBoardName,
            cards: []
        };

        // Almacenar el objeto de tableros actualizado en localStorage
        localStorage.setItem('boards', JSON.stringify(boards));

        // Crear un elemento en la lista de tableros
        const boardList = document.getElementById('boardList');
        const boardItem = document.createElement('div');
        boardItem.className = 'alert alert-info alert-dismissible fade show mt-2';
        boardItem.setAttribute('data-id', boardCount);
        console.log(newBoardName);
        boardItem.innerHTML = `
            <h1>${newBoardName}</h1>
            <button type="button" class="btn-close" aria-label="Close" onclick="deleteBoard(${boardCount})"></button>
            <a href="tablero.html?id=${boardCount}&name=${encodeURIComponent(newBoardName)}" class="btn btn-link">Abrir</a>
        `;
        boardList.appendChild(boardItem);

        // Redirigir automáticamente al nuevo tablero
        window.location.href = `tablero.html?id=${boardCount}&name=${encodeURIComponent(newBoardName)}`;

        // Cerrar modal y limpiar campo
        const modal = bootstrap.Modal.getInstance(document.getElementById('createBoardModal'));
        modal.hide();
        document.getElementById('newBoardName').value = '';
    }
});

// Función para manejar la eliminación de un tablero
function deleteBoard(boardId) {
    // Obtener los tableros existentes desde localStorage
    const boards = JSON.parse(localStorage.getItem('boards')) || {};

    // Eliminar el tablero del objeto
    delete boards[boardId];

    // Almacenar el objeto de tableros actualizado en localStorage
    localStorage.setItem('boards', JSON.stringify(boards));

    // Actualiza la interfaz para reflejar la eliminación
    const boardList = document.getElementById('boardList');
    const boardItem = boardList.querySelector(`[data-id='${boardId}']`);
    if (boardItem) {
        boardList.removeChild(boardItem);
    }
}

// Carga los tableros existentes al cargar la página
window.onload = function() {
    const boards = JSON.parse(localStorage.getItem('boards')) || {};
    console.log(boards);
    for (let id in boards) {
        const boardName = boards[id].name;

        // Crea un elemento en la lista de tableros
        const boardList = document.getElementById('boardList');
        const boardItem = document.createElement('div');
        boardItem.className = 'col-12 col-md-6 col-lg-3 cust alert alert-info alert-dismissible fade show mt-2 d-flex justify-content-between align-items-center';
        boardItem.setAttribute('data-id', id);
        boardItem.innerHTML = `
            <h3 class="truncate flex-grow-1">${boardName}</h3>
            <div class="d-flex align-items-center">
                <a href="tablero.html?id=${id}&name=${encodeURIComponent(boardName)}" class="btn btn-link">Abrir</a>
                <button type="button" class="btn-close cerrar ms-2" aria-label="Close" onclick="deleteBoard(${id})"></button>
            </div>
        `;
        boardList.appendChild(boardItem);
    }
};
