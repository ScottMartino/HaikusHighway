import axios from "axios"
/* import useContext and AppContext Component to useStates on the context component */
import { useContext, useEffect, } from "react";
import { AppContext } from "./AppContextProvider";

const FollowingWords = () => {
    const {
        syllableLineOne,
        lineOne, setLineOne,
        setSyllableLineOne,
        followingWords,
        setFollowingWords,
        queryUserInput, setQueryUserInput,
        completedHaiku, apiLoading,
        setApiLoading,
    } = useContext(AppContext);

    const handleOnClick = word => {
        const syllableCount = word.numSyllables;
        setSyllableLineOne(syllableLineOne - syllableCount);
        const currentLine = `${lineOne} ${word.word}`
        setLineOne(currentLine);
        setQueryUserInput(word.word);
    }

    useEffect(() => {
        setApiLoading(true)
        axios({
            url: 'https://api.datamuse.com/words',
            method: 'GET',
            params: {
                rel_jja: queryUserInput,
                rel_bga: queryUserInput,
                md: 's, p',
                max: 10
            }
        }).then((response) => {
            /* to filter out words that only meets syllable count limit */
            setApiLoading(false)
            setFollowingWords(
                response.data.filter((word) =>
                    word.numSyllables <= syllableLineOne
                )
            )
        })
        /* dependency of userInput is basically making autocomplete */
    }, [lineOne, queryUserInput, setFollowingWords, syllableLineOne, setApiLoading])

    return (
        <div className='follwingWordsContainer'>
            <p>Possible following words: Syllables Left <b>({syllableLineOne})</b></p>
            {apiLoading ? <p>Loading</p> : null}

            <ul className='followingWords' >
                {
                    ((followingWords.length === 0 && lineOne.length > 0 && syllableLineOne > 0) || (followingWords.length === 0 && completedHaiku.length > 0)) ? <li><p>No commonly following words exist.  Please enter another choice.</p></li> :
                        null
                }
                {
                    followingWords.map((word, index) => {
                        return (
                            <li key={`followingWords-${index}`}>
                                <button onClick={() => handleOnClick(word)}>
                                    {word.word} - {word.numSyllables}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default FollowingWords