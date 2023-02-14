import './App.scss';
// import axios from 'axios';
// import { useEffect } from 'react';
import Form from './Components/Form';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';

function App() {
  
  // const userInput = "accident"
  
  
  
  // useEffect(()=>{

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
  // },[])
    
  
  
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={
          <>
            <h1>Haiku Generator</h1>  
            <Form />
          </>
        } />
        <Route path='*' element={<ErrorPage />} />
      </Routes>



    </div>
  );
}

export default App;
