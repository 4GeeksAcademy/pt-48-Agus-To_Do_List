import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [itemToDo, updateItemToDo] = useState("");
  const [list, updateList] = useState({ itemToDo: "" });
  const [listItems, updateListItems] = useState([]);
  const [hoverStates, updateHoverStates] = useState([]);
  const [height, updateHeight] = useState(20 + 'vh')

  useEffect(() => {
    updateList({ itemToDo: itemToDo });
  }, [itemToDo]);

  const toDoList = () => {
    updateListItems([...listItems, list]);
    updateItemToDo("");
    updateHoverStates([...hoverStates, false]);
    updateHeight(height + 5)
  };

  const handleMouseEnter = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    updateHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    updateHoverStates(newHoverStates);
  };

  const handleDelete = (index) => {
    const updatedList = [...listItems];
    updatedList.splice(index, 1);
    updateListItems(updatedList);
    updateHeight(height - 5)
  };

  return (
    <>
      <div className="main__container text-center" style={{height: {height}}}>
        <input
          type="text"
          onChange={(e) => updateItemToDo(e.target.value)}
          value={itemToDo}
          placeholder="What needs to be done?"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              toDoList();
            }
          }}
        />
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => toDoList()}
        >
          Add
        </button>
        <ul className="items__container fa-ul mt-3">
          {listItems.map((element, index) => (
            <li key={index} className="mt-2">
              <div
                className="d-flex justify-content-between ms-2"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {element.itemToDo}
                {hoverStates[index] && (
                  <button
                    type="button"
                    className="btn-close bg-secondary"
                    aria-label="Close"
                    onClick={() => handleDelete(index)}
                  ></button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <span>{listItems.length} things to do before the deadline!</span>
      </div>
    </>
  );
}

export default Home;
