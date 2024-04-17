/* eslint-disable react-hooks/exhaustive-deps */
import Leaderboard from './Leaderboard/Leaderboard';
import { useState, useEffect } from 'react';
import data from './Leaderboard/data.json'

// Initial data is read from data.json
// Every 5 seconds, a random entry is selected and its values are incremented

function App( ) {
  const [currentData, setCurrentData] = useState(data)
  const timer = 5000

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const incrementData = () => {
      let chosenIndex = getRandomInt(currentData.length)
      let newCurrentData = currentData.map((item, i) => {
        return chosenIndex === i ?
          {...item,
            score: item.score += 10
          }
          :
          {...item}
      })
      setCurrentData([...newCurrentData])
    }
    incrementData()
    const interval = setInterval(() => {
        incrementData()
    }, [timer]);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []) 

  return (
    <>
    {currentData &&
      <Leaderboard
        currentData={currentData}
      />
    }
    </>
  );
}

export default App;
