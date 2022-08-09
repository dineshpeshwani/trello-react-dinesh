import React, { Component } from "react";
import {  Button, InputGroup } from "react-bootstrap";
import * as trelloAPI from "../api.js";

class CheckItemsInCheckList extends Component {
  state = {
    checkItems: [],
    checkItemName: "",
  };

  componentDidMount() {
    trelloAPI
      .getCheckItems(this.props.checkListId)
      .then((checkItems) => {
        this.setState({
          checkItems,
        });
      })
      .catch((err) => console.error(err));
  }

  handleCheckItemDelete = async (e, val, checkListId) => {
    e.preventDefault();
    await trelloAPI.deleteCheckItem(checkListId, val);
    let newList = this.state.checkItems.filter((newList) => {
      if (newList["id"] !== val) {
        return true;
      }
    });
    this.setState({
      checkItems: newList,
    });
  };

  handleCheckItemChange = (e) => {
    this.setState({
      checkItemName: e.target.value,
    });
  };

  handleCheckItemSubmit = async (e, val) => {
    e.preventDefault();
    const newList = await trelloAPI.addCheckItem(val, this.state.checkItemName);
    this.setState({
      checkItemName: "",
      checkItems: [newList, ...this.state.checkItems],
    });
  };

  handleCheckItemUpdate = (cardid, val, e) => {
    if (e) {
        trelloAPI.UpdateCheckItem(cardid, val, "complete")
        .then(() => trelloAPI.getCheckItems(this.props.checkListId)).then((res) => this.setState({
            checkItems: res
        })).catch(error => console.error(error))
    } else {
        trelloAPI.UpdateCheckItem(cardid, val, "incomplete")
        .then(() => trelloAPI.getCheckItems(this.props.checkListId))
        .then((res) => this.setState({
            checkItems: res
        })).catch(error => console.error(error))
    }
    // if(e){
    //      await trelloAPI.UpdateCheckItem(cardid, val, "complete");
    //      let newList  = this.state.checkItems.filter((newList) => {
    //       if(newList['id'] !== val){
    //           return true
    //       }
    //   })
    //   this.setState({
    //       checkItems : newList
    //   })
    // }else{
    //   await trelloAPI.UpdateCheckItem(cardid, val, "incomplete");
    //      let newList  = this.state.checkItems.filter((newList) => {
    //       if(newList['id'] !== val){
    //           return true
    //       }
    //   })
    //   this.setState({
    //       checkItems : newList
    //   })
    // }
}

  render() {
    let status
    if (this.state.checkItems.length !== 0) {
      return (
        <>
          {this.state.checkItems.map((each, index) => {
            each.state === "complete" ? status=true :  status=false
            return (<div key={index}>
              <InputGroup>
                <InputGroup.Checkbox 
                checked = {status}
                onChange={(e) => this.handleCheckItemUpdate(this.props.cardId, each.id, e.target.checked)} />
                <InputGroup.Text>
                  {each.name}
                  <Button
                    onClick={(e) =>
                      this.handleCheckItemDelete(
                        e,
                        each["id"],
                        this.props.checkListId
                      )
                    }
                    type="button"
                    variant="danger"
                  >
                    X
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </div>)
    })}
          <div>
            <input
              style={{ padding: "0.75rem", margin: "1rem" }}
              placeholder="Add New List"
              value={this.state.checkItemName}
              onChange={this.handleCheckItemChange}
              type="text"
              name="checkItem"
              id="text"
              required
            />
            <Button
              onClick={(e) =>
                this.handleCheckItemSubmit(e, this.props.checkListId)
              }
              style={{ margin: "1rem" }}
              type="submit"
            >
              Add Item
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p>No Items</p>
          <div style={{ margin: "1rem" }}>
            <input
              style={{ padding: "0.75rem" }}
              value={this.state.cardName}
              placeholder="Add New Item"
              onChange={this.handleCheckItemChange}
              type="text"
              name="checkItem"
              id="checkItem"
              required
            />
            <Button
              onClick={(e) =>
                this.handleCheckItemSubmit(e, this.props.checkListId)
              }
              style={{ marginLeft: "1rem" }}
              type="submit"
            >
              Add CheckItem
            </Button>
          </div>
        </>
      );
    }
  }
}

export default CheckItemsInCheckList;
