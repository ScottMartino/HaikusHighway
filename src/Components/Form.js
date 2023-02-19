import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContextProvider";
import DisplaySyllable from "./DisplaySyllable";

const Form = () => {
  const [syllableError, setSyllableError] = useState(false);
  const [noMatchError, setNoMatchError] = useState(false);

  /* const the state and  method we need */
  const {
    userInput, setUserInput,
    userError, setUserError,
    syllableLineOne, setSyllableLineOne,
    lineOne, setLineOne,
    setQueryUserInput,
    setCurrentSyllable,
    errorMessage, setErrorMessage,
  } = useContext(AppContext);

  const handleInputChange = e => {
    const regEx = /[\d\s.~!@#$%^&*()_+={}[\];',<>-]/g
    if (regEx.test(e.target.value)) {
      /* this means statement has number, special characters we do not want */
      setUserError(true);
    } else {
      /* reset userError display when corrected */
      setUserError(false);
      setUserInput(e.target.value);
    }
  }

  const handleInputSubmit = (event) => {
    event.preventDefault();
    /* set the userInput into queryUserInput to make axios call because queryUserInput is the useEffect dependency to trigger useEffect for following words. */
    setQueryUserInput(userInput);
    /* for resetting input */
    event.target[0].value = ('');

    /* onSubmit, check userInput for syllable and to add to the haiku line if everything is correct */
    axios({
      url: 'https://api.datamuse.com/words',
      method: 'GET',
      params: {
        sp: userInput,
        md: 's, p',
        max: 1
      }
    }).then((response) => {
      /* check if userInput return proper data */
      if (response.data[0] === undefined) {
        setNoMatchError(true);
      } else {
        setNoMatchError(false);
        const syllableCount = response.data[0].numSyllables;
        /* check if userInput word syllable count is within limit */
        if ((syllableLineOne - syllableCount) < 0) {
          setSyllableError(true);
        } else {
          setSyllableLineOne(syllableLineOne - syllableCount);
          /* check if it is the first word in a line */
          if (lineOne.length === 0) {
            const currentLine = userInput;
            setLineOne(currentLine);
            setSyllableError(false);
            setCurrentSyllable(0);
          } else {
            const currentLine = lineOne + ' ' + userInput;
            setLineOne(currentLine);
            setSyllableError(false);
            setCurrentSyllable(0);

          }
        }
      }
    })
  }

  /* set different error message depending on the error states */
  useEffect(() => {
    if (userError) {
      setErrorMessage('No numbers or special characters')
    } else if (syllableError) {
      setErrorMessage('Too many syllables')
    } else if (noMatchError) {
      setErrorMessage('Word does not exist')
    } else {
      setErrorMessage('');
    }
  }, [userError, syllableError, noMatchError, setErrorMessage])

  return (
    <div className='formContainer'>
      <h2>{lineOne}</h2>
      <form name="input" onSubmit={handleInputSubmit}>
        <label htmlFor="input">Enter first word of Haiku:  </label>
        {
          (errorMessage) ?
            <p className='boldText'>{errorMessage}</p> :
            <DisplaySyllable />
        }
        <div className="inputContainer">
          <input type="text" id="input" name="input" placeholder="eg. Plant" onChange={handleInputChange} required></input>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Form