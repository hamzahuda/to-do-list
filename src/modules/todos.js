import { addToDo } from "./modules/projects";

export default function createToDo(
    project,
    title,
    description,
    dueDate,
    priority
) {
    addToDo(project, { title, description, dueDate, priority });
}
