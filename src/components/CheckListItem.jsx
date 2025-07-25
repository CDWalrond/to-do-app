function CheckListItem({
  item,
  handleCheckboxClick,
  handleUpdateClick,
  handleDeleteClick,
  handleIsUpdatingValue,
  isUpdatingValue,
  setUpdateValue,
  updateValue,
}) {
  return (
    <>
      <li>
        {!isUpdatingValue ? (
          <>
            {item.text}{" "}
            <input
              type="checkbox"
              onChange={handleCheckboxClick(item.id)}
              checked={item.completed}
            />
            <button onClick={handleIsUpdatingValue(item.text)}>Update</button>
            <button onClick={handleDeleteClick(item.id)}>Delete</button>
          </>
        ) : (
          <>
            {" "}
            <input
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
            />
            <button onClick={handleUpdateClick(item.id)}>Update</button>
          </>
        )}
      </li>
    </>
  );
}
export default CheckListItem;
