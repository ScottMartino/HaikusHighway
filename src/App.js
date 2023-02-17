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
    setSyllableLineOne,
    setLineOne,
    setUserInput, 
    setQueryUserInput,
    setCompletedHaiku,
    setCurrentSyllable
  } = useContext(AppContext)

  const handleClear = () => {
    setSyllableLineOne(5);
    setLineOne('');
    setUserInput('');
    setQueryUserInput('');
    setCompletedHaiku([]);
    setCurrentSyllable(0);
  }

  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={
          <>
            <header>
              <h1>Haikus Highway</h1>
            </header>
            <main>
              <section>
                <DisplayHaiku />
              </section>
              <section>
                {
                  completedHaiku.length < 3 ?
                    <div>
                      <DisplaySyllable />
                      <FollowingWords />
                      <Form />
                    </div>
                    :
                    <h2>You're Done</h2>
                }
            <button onClick={handleClear}>Clear</button>
            </section> 
            </main>
            <footer>Created by Umai Rav, Jimmy Kang and Scott Martino at <a href="https://junocollege.com/">Juno College</a></footer>
          </>
        } />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;