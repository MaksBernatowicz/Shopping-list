import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [itemName, setItemName] = useState("");
  const [itemInfo, setItemInfo] = useState("");
  const [itemPrice, setItemPrice] = useState(null);
  const [itemCategory, setItemCategory] = useState("choose category..");

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
            className="add-item-input"
            placeholder="Add item name.."
          />
          <input
            value={itemInfo}
            onChange={(event) => setItemInfo(event.target.value)}
            className="add-item-input"
            placeholder="Add item name.."
          />
          <input
            value={itemPrice === null ? "" : itemPrice}
            onChange={(event) => setItemPrice(parseFloat(event.target.value))}
            className="add-item-input"
            placeholder="Add item name.."
          />
          <select
            value={itemCategory}
            onChange={(event) => setItemCategory(event.target.value)}
            className="add-item-input"
          >
            <option value="hardware">hardware</option>
            <option value="software">software</option>
            <option value="furniture">furniture</option>
            <option value="equipment">equipment</option>
          </select>
          <FontAwesomeIcon icon={faPlus} onClick={addNewItem} />
        </div>
      </div>
    </div>
  );
};

export { App };
