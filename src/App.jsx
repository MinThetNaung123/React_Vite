// Import necessary libraries and components
import { useState, useRef } from "react";
import accessoryData from "./accessory.json";
import DataTable from "./components/DataTable";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

// Define the main App component
function App() {
  // State hooks to manage selected items, filtered items, and price
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]);
  const [price, setPrice] = useState(accessoryData[0].price);
  const quantityRef = useRef(); // Reference for quantity input field
  const productRef = useRef(); // Reference for product select field

  // Function to filter selected items based on a keyword
  const search = (keyword) => {
    setFilteredSelectedItems(
      selectedItems.filter(item => item.name.includes(keyword))
    );
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    const productId = parseInt(productRef.current.value);
    const product = accessoryData.find(accessory => accessory.id === productId);
    const order = {
      ...product,
      quantity: quantityRef.current.value,
    };
    selectedItems.push(order);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
  };

  // Function to update price based on selected product
  const updatePrice = (e) => {
    const productId = parseInt(e.target.value);
    const product = accessoryData.find(accessory => accessory.id === productId);
    setPrice(product.price);
  };

  // Function to delete an item by its index
  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
  };

  // Function to sort items in ascending order
  const sortAscending = () => {
    const sortedItems = [...selectedItems].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredSelectedItems(sortedItems);
  };

  // Function to sort items in descending order
  const sortDescending = () => {
    const sortedItems = [...selectedItems].sort((a, b) => b.name.localeCompare(a.name));
    setFilteredSelectedItems(sortedItems);
  };

  // Render the component
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>Product:</Col>
          <Col xs={10}>
            <select ref={productRef} onChange={updatePrice}>
              {accessoryData.map((accessory, index) => (
                <option key={index} value={accessory.id}>
                  {accessory.name}
                </option>
              ))}
            </select>
          </Col>
          <Col>Price:</Col>
          <Col>{price}</Col>
          <Col>Quantity:</Col>
          <Col>
            <input type="number" ref={quantityRef} defaultValue={1} />
          </Col>
        </Row>
      </Container>
      <Button onClick={handleSubmit}>Submit</Button>

      <Container>
        <Button variant="link" onClick={sortAscending}>
          <i className="bi bi-arrow-up"></i>
        </Button>
        <Button variant="link" onClick={sortDescending}>
          <i className="bi bi-arrow-down"></i>
        </Button>
        <span>Sort</span>
        <DataTable 
          data={filteredSelectedItems} 
          onDelete={deleteItemByIndex}
          onSearch={search}
        />
      </Container>
    </>
  );
}

// Export the App component as default
export default App;
