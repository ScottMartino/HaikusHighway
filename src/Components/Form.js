import axios from "axios"
/* import useContext and AppContext Component to useStates on the context component */
import { useContext } from "react";
import { AppContext } from "./AppContextProvider";

const Form = () => {
    
  /* const the state and  method we need */
  const { 
    userInput, setUserInput, 
    userError, setUserError, 
    syllableLineOne, setSyllableLineOne,
    lineOne, setLineOne
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
  
  const handleInputSubmit = (event) =>{
        event.preventDefault();
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


        /* for following words */
        // axios({
        //     url: 'http://api.datamuse.com/words',
        //     method: 'GET',
        //     params:{
        //       rel_jja: userInput,
        //       rel_bga: userInput,
        //       md: 's, p',
        //       max: 100
        //     }
        //   }).then((response)=>{
        //     console.log(response.data)
        //   })
    }
    
    return(
    
    <div>
        <h3>Syllables Left: {syllableLineOne}</h3>   
        <h3>{lineOne}</h3>

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