import React, {useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AlbumInfo from './AlbumInfo'
import ArtistInfo from './ArtistInfo'

import { Link, Route } from "wouter";

interface infoAlbum {
    cover_image: string;
    year: string;
    title: string;
}

function App() {

  const [music, setMusic] = useState<infoAlbum[]>([]);
  const [isError, setIsError] = useState(false);
  const [listAlbum, setListAlbum] = useState(false);
  const [albumInfo, setAlbumInfo] = useState(true);
  const [authorInfo, setAuthorInfo] = useState(true);


  useEffect(() : void => {
      const fetchData = async () : Promise<void> => {
          setIsError(false);
          try {
              const response = await axios.get("https://api.discogs.com/database/search?q=Nirvana&type=release&format=album&key=KOvCOCoWkQzMUgahsKCJ&secret=mZhpQVyRALUMtgbxpsskNWeokbQumJac");

              const result = response.data.results;
              console.log(result);
              //setMusic(Object.entries(result).map(([key, value]) => ({key, value})));
              setMusic(result);

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
        {/*<div>
            <Link href="/users/1">
                <a className="link">Profile</a>
            </Link>

            <Route path="/about">About Us</Route>
            <Route path="/users/:name">{(params) => <div>Hello, {params.name}!</div>}</Route>
            <Route path="/inbox" component={App} />
        </div>
*/}
      <div id="listAlbum" hidden={listAlbum}>
          {music.map((item) => {return (
                  <div>
                      <img src={item.cover_image} alt="imageAlbum" />
                      <p>Nom de l'Album : {item.title}</p>
                      <p>Date de sortie : {item.year}</p>
                      <p>Artiste : Nirvana</p>
                  </div>
              );}
          )}
      </div>
      <div id="album" hidden={albumInfo}>
          <AlbumInfo />
      </div>

      <div id="author" hidden={authorInfo}>
          <ArtistInfo />
      </div>
    </div>

  );
}

export default App;
