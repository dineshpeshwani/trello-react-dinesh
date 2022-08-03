import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import * as trelloAPI from '../api.js';

class Boards extends Component {

  handleDelete = (val) => {
    trelloAPI.deleteBoard(val);
    
  };

  render() {
    let boardName = this.props.boards;
    if (boardName) {
      return (
        <div style={{ display: "flex", padding: "2rem", flexWrap: "wrap" }}>
          {boardName.map((board, index) => {
            return (
              <div key={index}>
                <Card
                  
                  style={{
                    width: "250px",
                    cursor: "pointer",
                    marginLeft: "1rem",
                  }}
                  className="bg-dark text-white"
                >
                  <Card.Img
                    src="https://res.cloudinary.com/dct4net75/image/upload/v1659424048/abstract_mkabs3.jpg"
                    alt="Card image"
                  />
                  <Card.ImgOverlay>
                    <Card.Title>{board["name"]}</Card.Title>
                  </Card.ImgOverlay>
                </Card>
                <div style={{display: "flex", justifyContent: "space-around", padding: "0.5rem"}}>
                  <Link to={`boards/${board.id}`}>
                  <Button variant="primary" type="button">
                    View
                  </Button>
                  </Link>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={(e) => 
                        {this.handleDelete(board["id"])
                        this.props.deleteBoard(board["id"])}}>
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <h1>No Boards Present..</h1>;
    }
  }
}

export default Boards;
