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

function addToProject(i, todo) {
    projects[i].todoList.push(todo);
}

function removeFromProject(projectIndex, todoIndex) {
    projects[projectIndex].todoList.splice(todoIndex, 1);
}

function moveToDo(fromProjectIndex, todoIndex, toProjectIndex) {
    addToProject(
        toProjectIndex,
        projects[fromProjectIndex].todoList[todoIndex]
    );
    removeFromProject(fromIndex, todoIndex);
}

export {
    createProject,
    deleteProject,
    addToProject,
    removeFromProject,
    moveToDo,
};
