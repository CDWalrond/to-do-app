function CheckListItem({ item }) {
  return (
    <>
      <li>
        {item.text} <input type="checkbox" checked={item.completed} />
      </li>
    </>
  );
}
export default CheckListItem;
