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

export function deleteList(id){
    return axios.put(`https://api.trello.com/1/lists/${id}/closed`, null, {
        params: {
            value: true
        }
    }).then(res => res.data);
}

export function getListCards(id){
    return axios.get(`https://api.trello.com/1/lists/${id}/cards`)
    .then(res => res.data);
}

export function addCard(idList, name){
    return axios.post('https://api.trello.com/1/cards?', null, {
        params: {
            idList,
            name
        }
    }).then(res => res.data);
}

export function deleteCard(id){
    return axios.delete(`https://api.trello.com/1/cards/${id}`)
    .then(res => res.data);
}