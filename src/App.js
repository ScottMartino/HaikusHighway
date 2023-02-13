import './App.scss';
import axios from 'axios';
import { useEffect } from 'react';
import Form from './Components/Form';

function App() {
  
  const userInput = "accident"
  
  
  
  useEffect(()=>{

    // axios({
    //   url: 'http://api.datamuse.com/words',
    //   method: 'GET',
    //   params:{
    //     rel_jja: userInput,
    //     rel_bga: userInput,
    //     md: 's, p',
    //     max: 100
    //   }
    // }).then((response)=>{
    //   console.log(response.data)
    // })
  },[])
    
  
  
  return (
    <div className="App">
      <h1>Haiku Generator</h1>  
      <Form />



    </div>
  );
}

export default App;
