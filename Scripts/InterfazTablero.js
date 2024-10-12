let boardCount = 0;

// Maneja la creación de un nuevo tablero
document.getElementById('confirmCreateBoardButton').addEventListener('click', function() {
    const newBoardName = document.getElementById('newBoardName').value;
    if (newBoardName) {
        boardCount++;
        const boardId = boardCount;

        // Almacena el tablero en localStorage
        localStorage.setItem(`board_${boardId}`, newBoardName);

        // Crea un elemento en la lista de tableros
        const boardList = document.getElementById('boardList');
        const boardItem = document.createElement('div');
        boardItem.className = 'alert alert-info alert-dismissible fade show mt-2';
        boardItem.setAttribute('data-id', boardId);
        boardItem.innerHTML = `
            ${newBoardName}
            <button type="button" class="btn-close" aria-label="Close" onclick="deleteBoard(${boardId})"></button>
            <a href="tablero.html?id=${boardId}&name=${encodeURIComponent(newBoardName)}" class="btn btn-link">Abrir</a>
        `;
        boardList.appendChild(boardItem);

        // Redirigir automáticamente al nuevo tablero
        window.location.href = `tablero.html?id=${boardId}&name=${encodeURIComponent(newBoardName)}`;

        // Cerrar modal y limpiar campo
        const modal = bootstrap.Modal.getInstance(document.getElementById('createBoardModal'));
        modal.hide();
        document.getElementById('newBoardName').value = '';
    }
});

// Maneja la apertura de un tablero existente
function openBoard(boardId) {
    window.location.href = `tablero.html?id=${boardId}`; // Redirige al tablero correspondiente
}

// Maneja la eliminación de un tablero
function deleteBoard(boardId) {
    // Elimina el tablero del localStorage
    localStorage.removeItem(`board_${boardId}`);

    // Actualiza la interfaz para reflejar la eliminación
    const boardList = document.getElementById('boardList');
    const boardItem = boardList.querySelector(`[data-id='${boardId}']`);
    if (boardItem) {
        boardList.removeChild(boardItem);
    }
}

// Carga los tableros existentes al cargar la página
window.onload = function() {
    for (let i = 1; i <= localStorage.length; i++) {
        const boardName = localStorage.getItem(`board_${i}`);
        if (boardName) {
            // Crea un elemento en la lista de tableros
            const boardList = document.getElementById('boardList');
            const boardItem = document.createElement('div');
            boardItem.className = 'alert alert-info alert-dismissible fade show mt-2';
            boardItem.setAttribute('data-id', i);
            boardItem.innerHTML = `
                ${boardName}
                <button type="button" class="btn-close" aria-label="Close" onclick="deleteBoard(${i})"></button>
                <a href="tablero.html?id=${i}&name=${encodeURIComponent(boardName)}" class="btn btn-link">Abrir</a>
            `;
            boardList.appendChild(boardItem);
        }
    }
};
