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
        completedHaiku
    } = useContext(AppContext);

    const handleOnClick = word => {
        const syllableCount = word.numSyllables;
        setSyllableLineOne(syllableLineOne - syllableCount);
        const currentLine = `${lineOne} ${word.word}`
        setLineOne(currentLine);
        setQueryUserInput(word.word);
    }

    useEffect(() => {
        axios({
            url: 'https://api.datamuse.com/words',
            method: 'GET',
            params: {
                rel_jja: queryUserInput,
                rel_bga: queryUserInput,
                md: 's, p',
                max: 20
            }
        }).then((response) => {
            /* to filter out words that only meets syllable count limit */
            setFollowingWords(
                response.data.filter((word) =>
                    word.numSyllables <= syllableLineOne
                )
            )
        })
        /* dependency of userInput is basically making autocomplete */
    }, [lineOne, queryUserInput, setFollowingWords, syllableLineOne])

    return (
        <ul className='followingWords' >
            {
                ((followingWords.length === 0 && lineOne.length > 0 && syllableLineOne > 0) || (followingWords.length === 0 && completedHaiku.length > 0)) ? <h2>no commonly following words exist</h2> :
                    null
            }
            {
                followingWords.map((word, index) => {
                    return (
                        <li key={`followingWords-${index}`}>
                            <button onClick={() => handleOnClick(word)}>
                                {word.numSyllables} {word.word}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default FollowingWords