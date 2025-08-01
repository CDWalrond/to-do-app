function CheckListItem({
  todo,
  handleToggleComplete,
  handleUpdateClick,
  handleDelete,
  handleSaveEdit,
  isUpdatingValue, // Should be a boolean
  setUpdateValue,
  updateValue,
}) {
  console.log("CheckListItem rendered with item:", todo);
  return (
    <>
      <li>
        {!isUpdatingValue ? (
          <>
            {todo.text}
            <input
              type="checkbox"
              onChange={() => handleToggleComplete(todo._id)}
              checked={todo.completed}
            />
            <button onClick={() => handleUpdateClick(todo._id)}>Update</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </>
        ) : (
          <>
            <input
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
            />
            <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
          </>
        )}
      </li>
    </>
  );
}
export default CheckListItem;
