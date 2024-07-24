import React from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useRef } from "react";
import { Button } from "react-bootstrap";

const DataTable = ({ data, onDelete, onSearch }) => {
  const sRef = useRef();

  const handleDelete = (index) => {
    onDelete(index);
  };

  const handleSearch = () => {
    const keyword = sRef.current.value;
    onSearch(keyword);
  };

  return (
    <Container>
      <input type="text" placeholder="Search..." ref={sRef} />{' '}
      <Button onClick={handleSearch}>Search</Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td><i className="bi bi-trash" onClick={() => handleDelete(index)}></i></td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DataTable;
