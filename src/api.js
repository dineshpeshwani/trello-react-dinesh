import axios from 'axios';

axios.defaults.params = {
    key: "803bd611c72d04e14780f7b8a18a6469",
    token: "85812a9f4130d0d70101830753aac683595ceee68553c8fde2aed1ccfad8249f",
}

export function getAllBoards(){
    return axios.get(`https://api.trello.com/1/members/me/boards?`)
    .then((res) => res.data);
}


export function createBoard(val){
    return axios.post(`https://api.trello.com/1/boards/`, null, {
        params: {
            name : val
        }
    })
}

export function deleteBoard(id){
    return axios.delete(`https://api.trello.com/1/boards/${id}`)
    .then((res) => res.data)
}


export function getList(id){
    return axios.get(`https://api.trello.com/1/boards/${id}/lists`)
    .then((res) => res.data);
}

export function addList(idBoard, name){
    return axios.post("https://api.trello.com/1/lists/", null, {
        params: {
            name , 
            idBoard
        }
    }).then(res => res.data);
}

export function getBoards(){
    return axios.get(``)
}