import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:3001";

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemInfo, setItemInfo] = useState("");
  const [itemPrice, setItemPrice] = useState(null);
  const [itemCategory, setItemCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/shoppingList`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const deleteItem = (event, id) => {
    event.preventDefault();
    fetch(`${API_URL}/shoppingList/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      });
  };

  const addNewItem = () => {
    fetch(`${API_URL}/shoppingList`, {
      method: "POST",
      body: JSON.stringify({
        name: itemName,
        info: itemInfo,
        price: itemPrice,
        category: itemCategory,
        quantity: 1,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
      });
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    setItems(newItems);
  };

  if (loading) return <div className="loading">LOADING...</div>;

  if (items.length === 0) return null;

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
            className="add-item-input"
            placeholder="add item name.."
          />
          <input
            value={itemInfo}
            onChange={(event) => setItemInfo(event.target.value)}
            className="add-item-input"
            placeholder="add item name.."
          />
          <input
            value={itemPrice === null ? "" : itemPrice}
            onChange={(event) => setItemPrice(parseFloat(event.target.value))}
            className="add-item-input"
            placeholder="add item name.."
          />
          <select
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            className="add-item-input"
          >
            <option value="" disabled hidden>
              choose category..
            </option>
            <option value="hardware">hardware</option>
            <option value="software">software</option>
            <option value="furniture">furniture</option>
            <option value="equipment">equipment</option>
          </select>
          <FontAwesomeIcon icon={faPlus} onClick={addNewItem} />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container" key={item.id}>
              <div className="item-props">
                {item.name} {item.info} {item.category} {item.price} PLN
                <button onClick={(event) => deleteItem(event, item.id)}>
                  Usuń z listy
                </button>
              </div>
              <div className="quantity">
                <button className="quantity__btn">
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span> {item.quantity} </span>
                <button className="quantity__btn">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { App };
