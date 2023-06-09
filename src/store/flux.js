const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            username: '',
            password: '',
            characters: null
        },
        actions: {
            getCharacters: (url, options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }) => {
                fetch(url, options)
                    .then(resp => resp.json())
                    .then(respJson => {
                        console.log(respJson);
                        setStore({ characters: respJson });
                    })
            }
        }
    }
}

export default getState;