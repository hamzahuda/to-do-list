import "./css/reset.css";
import "./css/style.css";
import {
    createProject,
    deleteProject,
    removeToDo,
    moveToDo,
    projects,
} from "./modules/projects";
import createToDo from "./modules/todos";
import { loadProjectList, loadToDoList } from "./modules/UI";

createProject("Inbox");
createToDo(0, "First To-Do in the inbox");
createToDo(0, "Second To-Do in the inbox");
createToDo(0, "Third To-Do in the inbox");
createToDo(0, "Fourth To-Do in the inbox");

window.addEventListener("DOMContentLoaded", () => {
    loadProjectList();
    loadToDoList(0);
});