import { useState, useRef } from "react";
import accessoryData from "./accessory.json";
import DataTable from "./components/DataTable";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]);
  const [price, setPrice] = useState(accessoryData[0].price);
  const quantityRef = useRef();
  const productRef = useRef();

  const search = (keyword) => {
    setFilteredSelectedItems(
      selectedItems.filter(item => item.name.includes(keyword))
    );
  };

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

  const updatePrice = (e) => {
    const productId = parseInt(e.target.value);
    const product = accessoryData.find(accessory => accessory.id === productId);
    setPrice(product.price);
  };

  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
  };

  const sortAscending = () => {
    const sortedItems = [...selectedItems].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredSelectedItems(sortedItems);
  };

  const sortDescending = () => {
    const sortedItems = [...selectedItems].sort((a, b) => b.name.localeCompare(a.name));
    setFilteredSelectedItems(sortedItems);
  };

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

export default App;
