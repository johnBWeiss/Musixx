import logo from './logo.svg';
import './App.css';
// import SongList from './components/SongList/SongList.js';
// import react from 'react';
// import { useRef, useState } from 'react'
// import ReactPlayer from 'react-player/youtube'
// import Player from './components/Player/Player';
// import YTSearch from 'youtube-api-search'
// import Favorites from './components/Favorites/Favorites';
// import Header from './components/Header/Header';
import { Route, Switch } from 'react-router-dom'
import AllFavorites from './pages/AllFavorites/AllFavorites';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';




function App() {


  // const artist = useRef("")
  // const songName = useRef("")

  // function videoSearch(term) {
  //   YTSearch({ key: "AIzaSyDkzCPPFU6hoflI7xIVOcKLZjgNDLvaT4A", term: term },
  //     (videos) => {
  //       setUrl(videos[0].id.videoId)

  //     }
  //   )
  // }

  // const [url, setUrl] = useState("7D6P08VvDiw")
  // const [inputArtist, setInputArtist] = useState("")
  // const [inputSong, setInputSong] = useState("")

  // function favoritesPageHandler() {
  //   console.log("go to favorites");
  // }

  // function toggleFavoriteHandler() {
  //   console.log("add favorite")
  // }

  // function inputArtistHandler(event) {
  //   setInputArtist(event.target.value)
  // }

  // function inputSongHandler(event) {
  //   setInputSong(event.target.value)
  // }

  // function clickHandler() {

  //   setInputSong("")
  //   setInputArtist("")
  //   const keyWord = (artist.current.value + " " + songName.current.value)
  //   videoSearch(keyWord)

  // }

  return (<>
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Route path="/AllFavorites" exact={true}>
        <AllFavorites />
      </Route>

      <Route path="/Blog" exact={true}>
        <Blog />
      </Route>
    </Switch>
    {/* <div className='wrapper'> */}


    {/* <Header /> */}

    {/* <div className="App">
        <h1>MusiXX</h1>
        <Player url={`https://www.youtube.com/watch?v=${url}`} width="100%" playing={false} />
        <div className='heartContainer'>
          <p className='heart' onClick={toggleFavoriteHandler}>♥</p>
          <p className='heartCluster' onClick={favoritesPageHandler}>
          // 
          </p>
        </div>
        <div className='searchInterface'>
          <input className="input" onChange={inputArtistHandler}
            ref={artist} value={inputArtist} placeholder='artist name' />
          <input className="input" onChange={inputSongHandler}
            ref={songName} value={inputSong} placeholder='song name' /> */}
    {/* <input className="input" onChange={inputHandler}
              ref={reffer} value={input} placeholder='random lyrics' /> */}

    {/* <button className="click" onClick={clickHandler}>Search</button>


        </div>
        <h2>favorites</h2>

        <div className='favorites-app'>
          <Favorites url={`https://www.youtube.com/watch?v=${"ptwt7Fs5INo"}`} width="100%" height="30vh" playing={true} />
          <Favorites url={`https://www.youtube.com/watch?v=${"l0yBFGZQYo0"}`} width="100%" height="30vh" playing={true} />
          <Favorites url={`https://www.youtube.com/watch?v=${"PhdhxvduVVA&list=RDPhdhxvduVVA&start_radio=1"}`} width="100%" height="30vh" playing={true} />

        </div> */}
    {/* <SongList songz={songList} /> */}


    {/* </div>
    </div> */}
  </>
  );
}

export default App;
