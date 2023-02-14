import axios from "axios"
/* import useContext and AppContext Component to useStates on the context component */
import { useContext } from "react";
import { AppContext } from "./AppContextProvider";

const Form = () => {
    
  /* const the state and  method we need */
  const { userInput, setUserInput } = useContext(AppContext);

  const handleInputChange = e => {
    setUserInput(e.target.value);
  }
  
  const handleInputSubmit = (event) =>{
        event.preventDefault()
        axios({
            url: 'http://api.datamuse.com/words',
            method: 'GET',
            params:{
              rel_jja: userInput,
              rel_bga: userInput,
              md: 's, p',
              max: 100
            }
          }).then((response)=>{
            console.log(response.data)
          })
    }
    
    return(
    
    <div>   
        <form name="input" onSubmit={handleInputSubmit}>
            <label htmlFor="input">Enter first word of Haiku:  </label>
            <input type="text" id="input" name="input" placeholder="eg. Plant" onChange={handleInputChange}></input>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default Form