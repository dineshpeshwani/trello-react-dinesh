import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import axios from "axios";
import * as trelloAPI from "../api";

class CreateNewBoard extends Component {
  state = {
    boardName: "",
  };

  onChange(value) {
    this.setState({
      boardName: value,
    });
  }

  handleSubmit = async(e) =>{
    e.preventDefault();
    const newBoard = await trelloAPI.createBoard(this.state.boardName);
    this.props.newBoard(newBoard.data);
  }

  render() {  
    return (
      <div style={{ padding: "3rem" }}>
        <Card
          style={{ width: "250px", height: "180px", cursor: "pointer" }}
          className="bg-dark text-white"
        >
          <Card.ImgOverlay style={{ background: "black", color: "white" }}>
            <Card.Title>Create new Board</Card.Title>
            <Form
              style={{ padding: "1rem 0" }}
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter Board Name"
                  autoFocus
                  required
                  onChange={(e) => this.onChange(e.target.value)}
                  value={this.state.boardName}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.ImgOverlay>
        </Card>
      </div>
    );
  }
}

export default CreateNewBoard;
