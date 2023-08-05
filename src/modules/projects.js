export const projects = [];

function createProject(title) {
    projects.push({
        title,
        todoList: [],
    });
}

function deleteProject(i) {
    projects.splice(i, 1);
}

function addToDo(i, todo) {
    projects[i].todoList.push(todo);
}

function removeToDo(projectIndex, todoIndex) {
    projects[projectIndex].todoList.splice(todoIndex, 1);
}

function moveToDo(fromProjectIndex, todoIndex, toProjectIndex) {
    addToDo(toProjectIndex, projects[fromProjectIndex].todoList[todoIndex]);
    removeToDo(fromProjectIndex, todoIndex);
}

export { createProject, deleteProject, addToDo, removeToDo, moveToDo };
