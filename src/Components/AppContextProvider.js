import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    /* any any states or fuctions you may wish to use via context */
    const [userInput, setUserInput] = useState('');


    return (
        <AppContext.Provider
            value={{
                userInput, setUserInput,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;