import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            username: '',
            password: '',
            characters: null,
            characters2: null
        },
        actions: {
            getCharacters: (url, options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }) => {
                fetch(url, options)
                    .then(resp => resp.json())
                    .then(respJson => {
                        console.log(respJson);
                        setStore({ characters: respJson });
                    })
            },
            getAxiosCharacters: (url, options = { headers: { 'Content-Type': 'application/json' } }) => {
                axios.get(url, options)
                    .then(({ data }) => setStore({ characters2: data }))
                    .catch(error => console.log(error))
                
                //
                /* const data = { username: '', password: '' }
                axios.post(url, data, options)
                    .then(({ data }) => setStore({ currentUser: data }))
                    .catch(error => console.log(error)) */
            }
        }
    }
}

export default getState;