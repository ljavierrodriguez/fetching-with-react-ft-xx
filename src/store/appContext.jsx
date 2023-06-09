import { createContext, useEffect, useState } from "react";
import getState from "./flux";
import * as config from '../config';

export const Context = createContext(null);

const injectContext = (PassedCompoonent) => {
    const StoreWrapper = () => {

        const [state, setState] = useState(getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: (updateStore) => setState({
                store: Object.assign(state.store, updateStore),
                actions: { ...state.actions }
            })
        }));

        useEffect(() => {
            //state.actions.getCharacters(config.API_URL);
            state.actions.getAxiosCharacters(config.API_URL);
        }, [])

        return (
            <Context.Provider value={state}>
                <PassedCompoonent />
            </Context.Provider>
        )
    }

    return StoreWrapper;
}

export default injectContext;