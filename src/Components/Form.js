import axios from "axios"
/* import useContext and AppContext Component to useStates on the context component */
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContextProvider";

const Form = () => {

  /* const the state and  method we need */
  const {
    userInput, setUserInput,
    userError, setUserError,
    syllableLineOne, setSyllableLineOne,
    lineOne, setLineOne,
    followingWords, setFollowingWords
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

  const handleOnClick = word => {
    // console.log('you clicked ', word.word);
    const syllableCount = word.numSyllables;
    setSyllableLineOne(syllableLineOne - syllableCount);
    // console.log(setSyllableLineOne);
    const currentLine = `${lineOne} ${word.word}`
    setLineOne(currentLine);
  }

  const handleInputSubmit = (event) => {
    event.preventDefault();

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
      const syllableCount = response.data[0].numSyllables;
      // console.log(response.data[0].numSyllables);
      setSyllableLineOne(syllableLineOne - syllableCount);
      // console.log(setSyllableLineOne);
      const currentLine = lineOne + userInput
      setLineOne(currentLine);
      // setUserInput('');

    })
  }

  /* for following words */
  useEffect(() => {
    console.log('useEffect running')
    console.log('userINput: ',userInput)
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
          followingWords.map(word => {
            return (
              <li>
                <button onClick={() => handleOnClick(word)}>
                  {word.numSyllables} {word.word}
                </button>
              </li>
            )
        })
        }
      </ul>

      <form name="input" onSubmit={handleInputSubmit}>
        <label htmlFor="input">Enter first word of Haiku:  </label>
        {
          (userError) ?
            <h2>no numbers or special chars</h2> :
            null
        }
        <input type="text" id="input" name="input" placeholder="eg. Plant" onChange={handleInputChange}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form