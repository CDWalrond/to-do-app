import CheckListItem from "./CheckListItem";
import todoData from "../../data/todoData";

function MyList() {
  const myComponents = todoData.map((item) => (
    <CheckListItem key={item.id} item={item} />
  ));
  return (
    <>
      <h1>THE To Do List</h1>
      <p>Text Text Text</p>
      <ul>{myComponents}</ul>
    </>
  );
}
export default MyList;
