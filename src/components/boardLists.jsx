import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import * as trelloAPI from "../api.js";
import CardsInList from "./cardsInList.jsx";

class BoardList extends Component {
  state = {
    lists: [],
    listName: "",
  };

  id = window.location.href.split("/")[4];
  componentDidMount() {
    trelloAPI.getList(this.id).then((lists) => {
      this.setState({ lists });
    });
  }

  handleChange = (e) => {
    this.setState({
      listName: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const newList = await trelloAPI.addList(this.id, this.state.listName);
    this.setState({
      listName: "",
      lists: [newList, ...this.state.lists],
    });
  };

  handleDelete = async (e, val) => {
    e.preventDefault();
    await trelloAPI.deleteList(val);
    let newList = this.state.lists.filter((newList) => {
      if (newList["id"] !== val) {
        return true;
      }
    });
    this.setState({
      lists: newList,
    });
  };

  render() {
    if (this.state.lists.length !== 0) {
      return (
        <div style={{ marginTop: "1rem" }}>
          <Form>
            <input
              style={{ padding: "0.75rem" }}
              placeholder="Add New List"
              value={this.state.listName}
              onChange={this.handleChange}
              type="text"
              name="list"
              id="list"
              required
            />
            <Button
              onClick={this.handleSubmit}
              style={{ padding: "0.75rem", marginLeft: "1rem" }}
              type="submit"
            >
              Add List
            </Button>
            <div style={{ display: "flex", overflowX: "auto" }}>
              {this.state.lists.map((list, index) => {
                return (
                  <Card
                    key={index}
                    style={{ margin: "1rem", minWidth: "350px" }}
                  >
                    <Card.Header as="h5">{list["name"]}</Card.Header>
                    <CardsInList listId={list["id"]} />
                    <Card.Body>
                      <br />
                      <Button
                        variant="danger"
                        type="submit"
                        onClick={(e) => this.handleDelete(e, list["id"])}
                      >
                        Delete List
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Form>
        </div>
      );
    }
  }
}

export default BoardList;
