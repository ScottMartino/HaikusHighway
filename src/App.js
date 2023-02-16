import './App.scss';
import Form from './Components/Form';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';

function App() {
return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            <h1>Haiku Generator</h1>  
            <Form />
          <footer>Created by Umai Rav, Jimmy Kang and Scott Martino at <a href="https://junocollege.com/">Juno College</a></footer>
          </>
        } />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;