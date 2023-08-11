import { saveProjectsToLocalStorage } from "./localStorage";

const projects = [];

function createProject(title) {
    projects.push({
        title,
        todoList: [],
    });
    saveProjectsToLocalStorage();
}

function deleteProject(i) {
    projects.splice(i, 1);
    saveProjectsToLocalStorage();
}

function addToDo(i, todo) {
    projects[i].todoList.push(todo);
    saveProjectsToLocalStorage();
}

function removeToDo(projectIndex, todoIndex) {
    projects[projectIndex].todoList.splice(todoIndex, 1);
    saveProjectsToLocalStorage();
}

function moveToDo(fromProjectIndex, todoIndex, toProjectIndex) {
    addToDo(toProjectIndex, projects[fromProjectIndex].todoList[todoIndex]);
    removeToDo(fromProjectIndex, todoIndex);
    saveProjectsToLocalStorage();
}

export { createProject, deleteProject, addToDo, removeToDo, projects };
