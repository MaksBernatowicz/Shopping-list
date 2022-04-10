import React, {useState} from "react";

const App = () => {


    const [itemName, setItemName] = useState("");
    const [itemInfo, setItemInfo] = useState("");
    const [itemPrice, setItemPrice] = useState(null);
    const [itemCategory, setItemCategory] = useState("choose category..");

  return (
      <div className="app-background">
        <div className="main-container">
          <div className="add-item-box">
            <input value={itemName} className="add-item-input" placeholder="Add item name.."/>
            <input value={itemInfo} className="add-item-input" placeholder="Add item name.."/>
            <input value={itemPrice === null ? "" : itemPrice} className="add-item-input" placeholder="Add item name.."/>
            <select value={itemCategory} className="add-item-input">

            </select>
          </div>
        </div>
      </div>
  )
}

export { App };
