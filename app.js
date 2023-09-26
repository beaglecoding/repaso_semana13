// Array para almacenar los temas de estudio
const tasks = [];

// Elementos del DOM
const newTaskInput = document.getElementById("newTask");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Función para obtener una imagen aleatoria de Lorem Picsum
async function getRandomImage() {
    try {
        const response = await fetch("https://picsum.photos/200/150");
        if (response.ok) {
            const imageSrc = response.url;
            return imageSrc;
        } else {
            throw new Error("Error al obtener la imagen de Lorem Picsum");
        }
        
    } catch (error) {
        console.error(error);
    }
    
}

// Función para agregar un tema de estudio a la lista
async function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === "") return;

    const imageSrc = await getRandomImage();

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <img src="${imageSrc}" alt="Tema de estudio">
        <span>${taskText}</span>
        <button class="complete">Completar</button>
        <button class="delete">Eliminar</button>
    `;

    taskList.appendChild(taskItem);
    tasks.push({ text: taskText, image: imageSrc });

    // Limpiar el campo de entrada
    newTaskInput.value = "";

    // Agregar eventos para completar y eliminar
    const completeButton = taskItem.querySelector(".complete");
    const deleteButton = taskItem.querySelector(".delete");

    completeButton.addEventListener("click", () => completeTask(taskItem));
    deleteButton.addEventListener("click", () => deleteTask(taskItem));
}

// Función para marcar un tema como completado
function completeTask(taskItem) {
    taskItem.classList.toggle("completed");
}

// Función para eliminar un tema de la lista
function deleteTask(taskItem) {
    const taskIndex = Array.from(taskList.children).indexOf(taskItem);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        taskList.removeChild(taskItem);
    }
}

// Evento para agregar un tema cuando se hace clic en el botón
addTaskButton.addEventListener("click", addTask);

// Evento para agregar un tema cuando se presiona Enter en el campo de entrada
newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});


