import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [ newsList, setNewsList ] = useState([]);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v3/articles")
      .then((response) => response.json())
      .then((data) => {
        setNewsList(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <div className="title">
        <h1>🌟 Space Odyssey News 🌟</h1>
      </div>
      <div className="news-container">
        {newsList.map((val, key) => {
          return (
            <div className="news" key={key} onClick={() => {window.location.href = val.url }}>
              <img src={val.imageUrl} alt="" />
              <p className="site--name">{val.newsSite} | {val.publishedAt}</p>
              <h2 className="site--title">{val.title}</h2> 
             <p className="site--desc">{val.summary}</p> 
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
