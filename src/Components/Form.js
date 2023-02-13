import axios from "axios"

const Form = () => {
    
    const handleInputSubmit = (event) =>{
        event.preventDefault()
        const uxerInput = event.target.input.value
        axios({
            url: 'http://api.datamuse.com/words',
            method: 'GET',
            params:{
            //   rel_jja: userInput,
            //   rel_bga: userInput,
              md: 's, p',
              max: 100
            }
          }).then((response)=>{
            // console.log(response.data)
          })
    }
    
    
    
    return(
    <div>   
        <form name="input" onSubmit={handleInputSubmit}>
            <label htmlFor="input">Enter first word of Haiku:  </label>
            <input type="text" id="input" name="input" placeholder="eg. Plant"></input>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default Form