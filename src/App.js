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
    lineOne,
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
        <header>
          <h1>Haikus Highway</h1>
        </header>
        <Routes>
          <Route path='/' element={
            <>
              <main>
                <section>
                  <DisplayHaiku />
                </section>
                <section>
                  {
                    completedHaiku.length < 3 ?
                      <div>
                        {<h2 className='lineOneDisplay'>{lineOne}</h2>}
                        <FollowingWords />
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
      <footer>
        Created by
        <a href="https://github.com/urav083" target="_blank" rel="noreferrer"> Umai Rav</a>,
        <a href="https://github.com/sjimmykang" target="_blank" rel="noreferrer"> Jimmy Kang</a> and
        <a href="https://github.com/ScottMartino" target="_blank" rel="noreferrer"> Scott Martino</a> at
        <a href="https://junocollege.com/" target="_blank" rel="noreferrer"> Juno College</a>
      </footer>
    </div>
  );
}

export default App;