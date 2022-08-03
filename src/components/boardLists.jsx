import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class BoardList extends Component {
  state = {};
  render() {
    return (
      <>
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        
        <Card style={{width: "25%", margin:"1rem"}}>
          <Card.Header as="h5">To Do</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text></Card.Text>
            <Button variant="primary">Add New Task</Button>
          </Card.Body>
        </Card>
        <Card style={{width: "25%", margin:"1rem"}}>
          <Card.Header as="h5">Doing</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text></Card.Text>
            <Button variant="primary">Add New Task</Button>
          </Card.Body>
        </Card>
        <Card style={{width: "25%", margin:"1rem"}}>
          <Card.Header as="h5">Done</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text></Card.Text>
            <Button variant="primary">Add New Task</Button>
          </Card.Body>
        </Card>
        <Card style={{width: "25%", margin:"1rem"}}>
          <Card.Header as="h5">Add New List</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text></Card.Text>
            <Button variant="primary">+</Button>
          </Card.Body>
        </Card>
        </div>
      </>
    );
  }
}

export default BoardList;
