import './App.scss';
import Form from './Components/Form';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';

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
    <div className='OuterContainer'>
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
                        <FollowingWords />
                        {/* <h3>{lineOne}</h3> */}
                        <Form />
                      </div>
                      :
                      <h3 className='youreDone'>You're Done</h3>
                  }
                  <button className='clearButton' onClick={handleClear}>Clear</button>
                </section>
              </main>
            </>
          } />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
       <footer>Created by Umai Rav, Jimmy Kang and Scott Martino at <a href="https://junocollege.com/">Juno College</a></footer>
    </div>
  );
}

export default App;