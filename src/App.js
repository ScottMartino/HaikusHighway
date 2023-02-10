import './App.scss';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  
  const userInput = "package"
  
  
  
  useEffect(()=>{

    axios({
      url: 'http://api.datamuse.com/words',
      method: 'GET',
      params:{
        // ml : "construction",
        // rel_bga: "construction",
        md: 's',
        sp: userInput,
        max: 1
      }
    }).then((response)=>{
      console.log(response.data)
    })
  },[])
    
  
  
  return (
    <div className="App">




    </div>
  );
}

export default App;
