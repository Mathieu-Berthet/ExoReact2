import React, {useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Link, Route } from "wouter";

function App() {

  const [music, setMusic] = useState([]);
  const [isError, setIsError] = useState(false);
  const [listAlbum, setListAlbum] = useState(false);
  const [albumInfo, setAlbumInfo] = useState(true);
  const [authorInfo, setAuthorInfo] = useState(true);

  let token = "dKXDMyIEylUQdtqUvuJNHHYcBTqKxFtHJWQGKrqo";

  useEffect(() : void => {
      const fetchData = async () : Promise<void> => {
          setIsError(false);
          try {
              const response = await axios.get("https://api.discogs.com/database/search?q=Nirvana",
                  {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  });

              let result = response.data;
              console.log(result);
              //setMusic(result);
          }
          catch (error)
          {
              setIsError(true);
              console.log(error);
          }
      };
      fetchData();
  }, []);
  return (

    <div className="App">
        <div>
            <Link href="/users/1">
                <a className="link">Profile</a>
            </Link>

            <Route path="/about">About Us</Route>
            <Route path="/users/:name">{(params) => <div>Hello, {params.name}!</div>}</Route>
            <Route path="/inbox" component={App} />
        </div>

      <div id="listAlbum" hidden={listAlbum}>
          {/*{music.map((item) => (
              <div>
                  <img src="" alt="imageAlbum" />
                  <p>{item}</p>
                  <p>{item}</p>
              </div>
          ))}*/}
      </div>
      <div id="album" hidden={albumInfo}>

      </div>

      <div id="author" hidden={authorInfo}>

      </div>
    </div>

  );
}

export default App;
