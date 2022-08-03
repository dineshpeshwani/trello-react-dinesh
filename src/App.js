import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Boards from "./components/boards";
import * as trelloAPI from "./api.js";
import CreateNewBoard from "./components/createNewBoard";
import BoardList from "./components/boardLists";
import ContentLoader, { Facebook } from "react-content-loader";

class App extends Component {
  state = {
    listName: "",
    boards: [],
    loaderState: false,
  };

  addBoard = (data) => {
    this.setState((prevState) => ({
      boards: [...prevState.boards, { name: data }],
    }));
  };

  componentDidMount() {
    trelloAPI.getAllBoards().then((boards) => {
      this.setState({ boards,
        loaderState: true });
    });
  }

  //  componentDidMount(){
  //   trelloAPI.getList("62e7a46dfad6972548fadcdb")
  //   .then(lists => {
  //     this.setState({lists})
  //   })
  //  }

  //  handleChange = (e) =>{
  //   this.setState({
  //     listName: e.target.value
  //   });
  //  };

  //  handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newList = trelloAPI.addList("62e7a46dfad6972548fadcdb", this.state.listName);
  //   this.setState({
  //     listName: "",
  //     lists: [newList, ...this.state.lists],
  //   });
  //  };


  render() {
    let loader = !this.state.loaderState ? (
        <ContentLoader
          height={140}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
          viewBox="0 0 380 70"
        >
          {/* Only SVG shapes */}
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
    ) : null;

    return (
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
          <Route exact path="/" element={
                <>
                  <CreateNewBoard newBoard={this.addBoard} />
                  <Boards boards={this.state.boards} />
                </>}
            />
            <Route path="/boards/:code" element={<BoardList></BoardList>}></Route>
            <Route path="*" element={<h1>Error!!</h1>} />
          </Routes>
        </BrowserRouter>

        {/* <form onSubmit={this.handleSubmit}>
          <input value={this.state.listName} 
          onChange ={this.handleChange}
          type="text" name='list' id='list' />
          <button type='submit'>Add List</button>
          <ul>
            {this.state.lists.map(list => {
              return <li key={list.id}>{list.name}</li>
            })}
          </ul>
        </form> */}
      </div>
    );
  }
}

export default App;
