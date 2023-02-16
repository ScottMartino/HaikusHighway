import axios from "axios"
/* import useContext and AppContext Component to useStates on the context component */
import { useContext, useState } from "react";
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
    setCompletedHaiku,
    setQueryUserInput,
    setCurrentSyllable,
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

  const handleClear = () => {
    setSyllableLineOne(5);
    setLineOne('');
    setUserInput('');
    setQueryUserInput('');
    setCompletedHaiku([]);
    setCurrentSyllable(0)
  }

  const handleInputSubmit = (event) => {
    event.preventDefault();
    /* set the userInput into queryUserInput to make axios call because queryUserInput is the useEffect dependency */
    setQueryUserInput(userInput);
    /* to trigger useEffect for following words. we still use userInput on this axios because this triggers off submit function and not useEffect */

    /* for resetting input */
    event.target[0].value = ('');

    /* queryUserInput for syllable */
    axios({
      url: 'https://api.datamuse.com/words',
      method: 'GET',
      params: {
        sp: userInput,
        md: 's, p',
        max: 1
      }
    }).then((response) => {
      if (response.data[0] === undefined) {
        setNoMatchError(true);
      } else {
        setNoMatchError(false);
        const syllableCount = response.data[0].numSyllables;
        if ((syllableLineOne - syllableCount) < 0) {
          setSyllableError(true);
        } else {
          setSyllableLineOne(syllableLineOne - syllableCount);
          const currentLine = lineOne + ' ' + userInput;
          setLineOne(currentLine);
          setSyllableError(false);
          setCurrentSyllable(0)
        }
      }
    })
  }

  return (
    <div>
      <h3>{lineOne}</h3>
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