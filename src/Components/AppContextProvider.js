import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    /* any any states or fuctions you may wish to use via context */
    const [userInput, setUserInput] = useState('');
    const [userError, setUserError] = useState(false);
    const [syllableLineOne, setSyllableLineOne] = useState(5);
    const [lineOne, setLineOne] = useState('');
    const [followingWords, setFollowingWords] = useState([]);
    const [completedHaiku, setCompletedHaiku] = useState([]);
    const [queryUserInput, setQueryUserInput] = useState('');

    return (
        <AppContext.Provider
            value={{
                userInput, setUserInput,
                userError, setUserError,
                syllableLineOne, setSyllableLineOne,
                lineOne, setLineOne,
                followingWords, setFollowingWords,
                completedHaiku, setCompletedHaiku,
                queryUserInput, setQueryUserInput,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;