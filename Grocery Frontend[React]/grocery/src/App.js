// src/App.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [focused, setFocused] = useState(false); // set false as initial value
  const [focusedPr, setFocusedPr] = useState(false);
  const [showItemList, setShowItemList] = useState(false);
  const handleAddNewItem = () => {
    setShowInputBoxes(true);
    setShowItemList(false);
  };
  const handleSaveItems = async () => {
    if (itemName && itemPrice) {
      const newItem = { name: itemName, price: itemPrice };
      
      try {
        const response = await fetch('http://localhost:8090/api/grocery/addGrocery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });

        if (response.ok) {
          setItems([...items, newItem]);
          setShowInputBoxes(false);
          setItemName('');
          setItemPrice('');
          toast.success('Item saved successfully!');
        } else {
          console.error('Failed to add item to the database.');
          toast.error('Failed to save item.');
        }
      } catch (error) {
        console.error('Error sending request:', error);
        toast.error('Failed to save item.');
      }
    } else {
      alert('Please enter both name and price.');
    }
  };
  const handleGetAllItems = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/grocery/getGroceries');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
        setShowItemList(true);
      } else {
        console.error('Failed to fetch items from the database.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  // useEffect(() => {
  //   // Fetch items when the component mounts
  //   handleGetAllItems();
  // }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery Store</h1>
      </header>
      <main>
      {showInputBoxes ? (
          <div>
            <label style={{color: focused ? 'red' : 'white'}}>
              Name:
              <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onFocus={() => setFocused(true)}
                onChange={(event) => setItemName(event.target.value)
                }
              />
            </label>
            <label style={{color: focusedPr ? 'red' : 'white'}}>
              Price:
              <input
                type="text"
                placeholder="Item Price"
                value={itemPrice}
                onFocus={() => setFocusedPr(true)}
                onChange={(event) => setItemPrice(event.target.value)}
              />
            </label>
            <button onClick={handleSaveItems}>Save Item</button>
          </div>
        ) : (
          <button onClick={handleAddNewItem}>Add New Item</button>
        )}
        <button onClick={handleGetAllItems}>Get All Items</button>
        {showItemList && (
          <div>
            <h2>All Items</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{`${item.name} - $${item.price}`}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
