import "./css/reset.css";
import "./css/style.css";
import {
    deleteProject,
    createProject,
    removeFromProject,
    addToProject,
    projects,
} from "./modules/projects";

createProject("Inbox");
addToProject(0, { title: "My First To-Do" });
console.log(projects);
