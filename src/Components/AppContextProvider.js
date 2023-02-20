import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [userInput, setUserInput] = useState('');
    const [userError, setUserError] = useState(false);
    const [syllableLineOne, setSyllableLineOne] = useState(5);
    const [lineOne, setLineOne] = useState('');
    const [followingWords, setFollowingWords] = useState([]);
    const [completedHaiku, setCompletedHaiku] = useState([]);
    const [queryUserInput, setQueryUserInput] = useState('');
    const [currentSyllable, setCurrentSyllable] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [apiLoading, setApiLoading] = useState(false);

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
                currentSyllable, setCurrentSyllable,
                errorMessage, setErrorMessage,
                apiLoading, setApiLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;