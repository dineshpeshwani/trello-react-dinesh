import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as trelloAPI from "./api.js";
import Navbar from "./components/navbar";
import Boards from "./components/boards";
import CreateNewBoard from "./components/createNewBoard";
import BoardList from "./components/boardLists";
import ContentLoader from "react-content-loader";

class App extends Component {
  state = {
    listName: "",
    boards: [],
    loaderState: false,
  };

  addBoard = (data) => {
    this.setState((prevState) => ({
      boards: [...prevState.boards, data],
    }));
  };

  fectchApi = async()=>{
   await  trelloAPI.getAllBoards().then((boards) => {
      this.setState({ boards,
        loaderState: true });
    });
  }

  componentDidMount() {
    this.fectchApi()
  }

  deleteBoard=(id)=>{
    const updatedBoards = this.state.boards.filter(eachBoard=>eachBoard.id!==id)
    this.setState({boards:updatedBoards})
  }

  render(){

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
                  <Boards boards={this.state.boards} deleteBoard={this.deleteBoard}/>
                </>}
            />
            <Route path="/boards/:code" element={<BoardList/>}></Route>
            <Route path="*" element={<h1>Page Not Found!!</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
