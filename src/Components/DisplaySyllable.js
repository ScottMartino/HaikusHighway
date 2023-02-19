import axios from "axios"
import { useContext, useEffect, } from "react";
import { AppContext } from "./AppContextProvider";

function DisplaySyllable() {
    const {
        userInput,
        currentSyllable,
        setCurrentSyllable,
    } = useContext(AppContext);
    /* axios fetch onChange userInput to grab the number of syllables for userInputted word */
    useEffect(() => {
        axios({
            url: 'https://api.datamuse.com/words',
            method: 'GET',
            params: {
                sp: userInput,
                md: 's',
                max: 1
            }
        }).then((response) => {
            if (response.data[0] !== undefined) {
                setCurrentSyllable(response.data[0].numSyllables);
            }
        })
    }, [userInput, setCurrentSyllable])

    return (
        <div className="syllableCountContainer">
            <p>Current Word Syllable: <b>{currentSyllable}</b></p>
        </div>
    )
}

export default DisplaySyllable;