import React, { Component } from "react";
import { Card, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as trelloAPI from "../api.js";
import CheckItemsInCheckList from "./checkItemsInCheckList.jsx";

class Example extends Component {
  state = {
    setShow: false,
    checkListName: "",
    checkList : []
  };

    handleSetShow(){
    this.setState({
        setShow : true,
    })
  }

  handleHide = () => this.setState({setShow: false})

    handleCheckList = (e, val) => {
    e.preventDefault();
    trelloAPI.getChecklist(val)
    .then((checkList) => {
        this.setState({
            checkList
        })
    })
    .catch((err) => console.log(err));
  }

  handleCheckListChange = (e) => {
    this.setState({
      checkListName: e.target.value,
    });
  };

  handleCheckListSubmit = async (e, val) => {
    e.preventDefault()
    const newList = await trelloAPI.addCheckList(val, this.state.checkListName);
    this.setState({
      checkListName: "",
      checkList: [...this.state.checkList, newList],
    });
  };

  handleCheckListDelete = async (e, val) => {
    e.preventDefault();
    await trelloAPI.deleteCheckList(val);
    let newList = this.state.checkList.filter((newList) => {
      if (newList["id"] !== val) {
        return true;
      }
    });
    this.setState({
      checkList: newList,
    });
  };

  showCheckList = ()=>(
    <>{this.state.checkList.map(((EachItem, index) =>{
        return (
          <Card key={index} style={{margin: "1rem"}}>
            <Card.Header>
                {EachItem.name}
                <Button variant="danger" style={{float: "right"}} onClick={(e) => this.handleCheckListDelete(e, EachItem["id"])}>Delete</Button>
            </Card.Header>
            <Card.Body>
                <CheckItemsInCheckList checkListId = {EachItem.id} cardId = {this.props.cardId}/>
            </Card.Body>
          </Card>)
    } 
          ))}
    </>
  )

  showAddCheckItemButton = () => {
   return(<div style={{margin: "1rem"}}> 
     <input 
        style={{padding:"0.5rem"}} 
        value={this.state.checkListName}
        onChange={this.handleCheckListChange}
        type="text" 
        placeholder="add checklist"
        required
        /> 
     <Button 
        style={{marginLeft: "1rem"}}
        onClick={(e) => this.handleCheckListSubmit(e, this.props.cardId)}
        type="submit">
      add
    </Button>
    </div>)
  }

  render() {
    return (
      <>
        <Button onClick={() => this.handleSetShow()}>View Card</Button>
        <Modal
          size="lg"
          show={this.state.setShow}
          onHide={() => this.handleHide()}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {this.props.cardName}
            </Modal.Title>
          </Modal.Header>       
          <Modal.Body>
            <Button style={{margin:"1rem"}} type="button" onClick={(e) => this.handleCheckList(e, this.props.cardId)}>Check List</Button>
            {(this.state.checkList && this.state.checkList.length>0) ? this.showCheckList() : null}
            {this.showAddCheckItemButton()}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Example; 