import './App.scss';
import Form from './Components/Form';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import DisplaySyllable from './Components/DisplaySyllable';
import FollowingWords from './Components/FollowingWords';
import DisplayHaiku from './Components/DisplayHaiku';
import { useContext } from 'react';
import { AppContext } from './Components/AppContextProvider';

function App() {
  const {
    completedHaiku,
  } = useContext(AppContext)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            <h1>Haikus Highway</h1>
            <DisplayHaiku />
            {
              completedHaiku.length < 3 ?
                <>
                  <DisplaySyllable />
                  <FollowingWords />
                  <Form />
                </>
                : 
                <h2>You're Done</h2>
            }
            
            <footer>Created by Umai Rav, Jimmy Kang and Scott Martino at <a href="https://junocollege.com/">Juno College</a></footer>
          </>
        } />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;