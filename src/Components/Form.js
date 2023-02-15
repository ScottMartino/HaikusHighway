import axios from "axios"
/* import useContext and AppContext Component to useStates on the context component */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContextProvider";

const Form = () => {

  const [syllableError, setSyllableError] = useState(false);
  const [noMatchError, setNoMatchError] = useState(false);
  /* const the state and  method we need */
  const {
    userInput, setUserInput,
    userError, setUserError,
    syllableLineOne, setSyllableLineOne,
    lineOne, setLineOne,
    followingWords, setFollowingWords,
    completedHaiku, setCompletedHaiku,
    queryUserInput, setQueryUserInput,
  } = useContext(AppContext);

  const handleInputChange = e => {
    // const regEx = /[a-z]/g
    const regEx = /[\d\s.~!@#$%^&*()_+={}[\];',<>-]/g
    if (regEx.test(e.target.value)) {
      /* this means statement has number, special characters we do not want */
      setUserError(true);
    } else {
      /* reset userError display when corrected */
      setUserError(false);
      setUserInput(e.target.value);

    }
    // console.log(regEx.test(e.target.value))
  }

  const handleClear = () => {
    setSyllableLineOne(5);
    setLineOne('');
    setUserInput('');
  }

  useEffect(() => {
    const completedLine = [...lineOne];
    setCompletedHaiku(completedLine);
  }, [lineOne, setCompletedHaiku])

  const handleOnClick = word => {
    // console.log('you clicked ', word.word);
    const syllableCount = word.numSyllables;

    setSyllableLineOne(syllableLineOne - syllableCount);
    // console.log(setSyllableLineOne);
    const currentLine = `${lineOne} ${word.word}`
    setLineOne(currentLine);
    setUserInput(word.word);
  }

  const handleInputSubmit = (event) => {
    event.preventDefault();
    // console.log("asdf  ", event.target[0].value === false)

    /* for resetting input */
    event.target[0].value = ('');


    // console.log(event.target[0].value);
    /* finding userInput word's syllable */
    axios({
      url: 'http://api.datamuse.com/words',
      method: 'GET',
      params: {
        sp: userInput,
        md: 's, p',
        max: 1
      }
    }).then((response) => {
      if (response.data[0] === undefined) {
        setNoMatchError(true)
      } else {
        setNoMatchError(false);
        const syllableCount = response.data[0].numSyllables;

        if ((syllableLineOne - syllableCount) < 0) {
          setSyllableError(true);
        } else {
          // console.log(response.data[0].numSyllables);
          setSyllableLineOne(syllableLineOne - syllableCount);
          // console.log(setSyllableLineOne);
          const currentLine = lineOne + ' ' + userInput
          setLineOne(currentLine);
          // setUserInput('');
          setSyllableError(false);


        }

      }



    })
  }

  /* for following words */
  useEffect(() => {
    // console.log('useEffect running')
    // console.log('userINput: ', userInput)
    axios({
      url: 'http://api.datamuse.com/words',
      method: 'GET',
      params: {
        rel_jja: userInput,
        rel_bga: userInput,
        md: 's, p',
        max: 20
      }
    }).then((response) => {

      // console.log(userInput)
      // console.log("before: ", response.data)

      /* to filter out words that only meets syllable count limit */
      setFollowingWords(
        response.data.filter((word) =>
          word.numSyllables <= syllableLineOne
        )
      )
      console.log('following; ', followingWords)

      // console.log("after: ",followingWordsArray)
      // console.log(followingWords);
    })
    /* dependency of userInput is basically making autocomplete */
  }, [lineOne])


  return (

    <div>
      <h3>Syllables Left: {syllableLineOne}</h3>
      <h3>{lineOne}</h3>

      <ul>
        {
          (followingWords.length === 0 && lineOne.length > 0 && syllableLineOne > 0) ? <h2>no commonly following words exist</h2> :
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

      <div>
        {syllableLineOne === 0 ? completedHaiku : null}
      </div>

      <form name="input" onSubmit={handleInputSubmit}>
        <label htmlFor="input">Enter first word of Haiku:  </label>
        {
          (userError) ?
            <h2>no numbers or special chars</h2> :
            null
        }
        {
          (syllableError) ?
            <h2>too many syllables</h2> :
            null
        }
        {
          (noMatchError) ?
            <h2>word does not exist</h2> :
            null
        }
        <input type="text" id="input" name="input" placeholder="eg. Plant" onChange={handleInputChange} required></input>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleClear}>Clear</button>
    </div>
  )
}

export default Form