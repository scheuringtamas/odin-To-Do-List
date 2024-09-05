function createToDoListItem(
  title,
  description,
  dueDate,
  priority,
  notes,
  checklist,
  projects = "default"
) {
  const validPriorities = ["low", "medium", "high"];

  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    projects,
  };
}
