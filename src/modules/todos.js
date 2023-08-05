export default function todoFactory(
    title,
    description,
    dueDate,
    priority,
    project
) {
    return { title, description, dueDate, priority };
}
