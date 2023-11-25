import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [ newsList, setNewsList ] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v3/articles")
      .then((response) => response.json())
      .then((data) => {
        setNewsList(data);
        //console.log(data);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  function formatDateTime(dateTime) {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return dateTime.toLocaleDateString('en-US', options);
  }
  

  return (
    <div className="App">
  <div className="container">
    <header>
    <h1>Space Odyssey News</h1>
    <p>{formatDateTime(currentDateTime)}</p>
    </header>
    <div className="row">
      {/* Large card for the first news item */}
      {newsList.length > 0 && (
        <div className="col-12">
          <div className="mycard mb-4" onClick={() => {window.location.href = newsList[0].url }}>
            <img src={newsList[0].imageUrl} alt="" className="card-img-top" />
            <div className="main-card-body">
              <p className="main-card-text">{newsList[0].newsSite} | {formatDate(newsList[0].publishedAt)}</p>
              <h2 className="main-card-title">{newsList[0].title}</h2>
              <p className="main-card-text">{newsList[0].summary}</p>
            </div>
          </div>
        </div>
      )}

      {/* Two-card layout for the rest of the news items */}
      {newsList.slice(1).map((val, key) => {
        return (
          <div className="col-lg-6 col-md-4 col-sm-6" key={key}>
            <div className="smallcard mb-4" onClick={() => {window.location.href = val.url }}>
              <img src={val.imageUrl} alt="" className="card-img-top img-fluid" />
              <div className="small-card-body">
                <p className="small-card-text">{val.newsSite} | {formatDate(val.publishedAt)}</p>
                <h2 className="small-card-title">{val.title}</h2>
                <p className="small-card-text">{val.summary}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  <footer>
    <div className="footer-content">
        <p>Brought to you with ❤️ by </p>
        <a href="https://github.com/Tauhid-Patel" target="_blank" rel="noreferrer">
            <span className="footer-name">@tauhidpatel</span>
        </a>
    </div>
  </footer>
</div>


  );
}

export default App;
