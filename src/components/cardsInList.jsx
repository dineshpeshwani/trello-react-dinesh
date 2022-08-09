import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import * as trelloAPI from "../api.js";
import Example from "./viewCardModal.jsx";

class CardsInList extends Component {
  state = {
    cards: [],
    cardName: "",
  };


  componentDidMount() {
    trelloAPI
      .getListCards(this.props.listId)
      .then((cards) => {
        this.setState({
          cards,
        });
      })
      .catch((err) => console.error(err));
  }

  handleCardDelete = async (e, val) => {
    e.preventDefault();
    await trelloAPI.deleteCard(val);
    let newList = this.state.cards.filter((newList) => {
      if (newList["id"] !== val) {
        return true;
      }
    });
    this.setState({
      cards: newList,
    });
  };

    handleCardChange = (e) => {
      this.setState({
        cardName: e.target.value,
      });
    };

    handleCardSubmit = async (e, val) => {
      e.preventDefault()
      const newList = await trelloAPI.addCard(val, this.state.cardName);
      this.setState({
        cardName: "",
        cards: [newList, ...this.state.cards],
      });
    };

  render() {
    if (this.state.cards.length !== 0) {
      return (
        <>
          {this.state.cards.map((each, index) => (
            <div key={index} style={{ margin: "1rem", border: "1px dotted black", borderRadius: "10px", padding:"1rem"}}>
              <h4>{each.name}</h4>
              <div style={{ display: "flex", justifyContent: "space-around", padding: "1rem"}}>
                <Example cardId = {each['id']}
                          cardName = {each['name']}
                />
                <Button
                  onClick={(e) => this.handleCardDelete(e, each["id"])}
                  type="button"
                  variant="danger"
                  style={{ width: "130px", padding:"0"  }}
                >
                  Delete Card
                </Button>
              </div>
            </div>
          ))}
          <div >
          <input
            style={{padding: "0.75rem", margin:"1rem"}}
            placeholder =  "Add New List"
              value={this.state.cardName}
              onChange={this.handleCardChange}
              type="text"
              name="card"
              id= "text"
              required  
            />
              <Button onClick={(e) => this.handleCardSubmit(e, this.props.listId)} style={{margin: "1rem"}} type="submit"  
              >Add Card</Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p>No Task</p>
          <div style={{margin:"1rem"}}>
           <input
            style={{padding: "0.75rem"}}
            value={this.state.cardName}
            placeholder =  "Add New Card"
              onChange={this.handleCardChange}
              type="text"
              name="list"
              id="list"
              required
            />
              <Button onClick={(e) => this.handleCardSubmit(e, this.props.listId)} style={{marginLeft: "1rem"}} type="submit"  
              >Add card</Button>
          </div>
        </>
      );
    }
  }
}

export default CardsInList;