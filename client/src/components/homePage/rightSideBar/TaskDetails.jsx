const TaskDetails = ({ selectedTask }) => {
  const {
    id,
    shortDescription,
    longDescription,
    completed,
    dueDate,
    createdAt,
  } = selectedTask;
  return (
    <div>
      <p>{shortDescription}</p>
      <p>{longDescription}</p>
      <p>{createdAt}</p>
      <p>delete Task</p>
    </div>
  );
};

export default TaskDetails;
