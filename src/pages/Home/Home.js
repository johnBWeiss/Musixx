import './Home.css';
import react from 'react';
import { useRef, useState, useContext, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'
import FavoritesContext from '../../store/Favorites-context';
import { Link } from 'react-router-dom';
import Player from '../../components/Player/Player';
import YTSearch from 'youtube-api-search'
import Favorites from '../../components/Favorites/Favorites';
import Header from '../../components/Header/Header';
import { Route, Switch } from 'react-router-dom'
import AllFavorites from '../AllFavorites/AllFavorites';
import cluster from "../../images/cluster.png"
import heart from "../../images/heart.png"
import broken from "../../images/broken.png"
import Login from '../../components/Login/Login';



//TODO make the heart be empty when i search again for something that is in the favorites

function Home(props) {


    const favoritesCtx = useContext(FavoritesContext);
    console.log("testing this token", favoritesCtx.currentToken);
    const [display, setDisplay] = useState(broken)
    const currentFav = { fav: false }
    const nowUrl = favoritesCtx.currentUrl

    console.log(nowUrl);
    const [currentFavorite, setCurrentFavorite] = useState(false)

    const URL = { url: "ptwt7Fs5INo", title: "our last night: you broke me first" }
    //check if this is the right parameter, needs to ne the current url

    // useEffect(() => {
    //     const checker = favoritesCtx.itemIsFavorite(URL.url)
    //     if (checker) {
    //         setDisplay("💗")
    //     }
    //     else {
    //         setDisplay("♡")

    //     }

    // }, [])


    const artist = useRef("")
    const songName = useRef("")

    useEffect(() => {
        {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    }, [])


    function videoSearch(term) {
        YTSearch({ key: "AIzaSyDkzCPPFU6hoflI7xIVOcKLZjgNDLvaT4A", term: term },
            (videos) => {
                setUrl(videos[0].id.videoId)
                setTitle(videos[0].snippet.title)
                favoritesCtx.changeCurrentUrl(videos[0].id.videoId)
                const checkFavStatus = favoritesCtx.itemIsFavorite(videos[0].id.videoId)
                if (checkFavStatus) {
                    setDisplay(heart)
                } else {
                    setDisplay(broken)

                }


                URL.url = videos[0].id.videoId
                URL.title = videos[0].snippet.title




            }
        )
    }

    const [url, setUrl] = useState(nowUrl)
    const [title, setTitle] = useState(URL.title)

    const [inputArtist, setInputArtist] = useState("")
    const [inputSong, setInputSong] = useState("")

    useEffect(() => {
        const firstRenderIsFavorite = favoritesCtx.itemIsFavorite(favoritesCtx.currentUrl)
        if (firstRenderIsFavorite) {
            setDisplay(heart)
        } else {
            setDisplay(broken)
        }

        // artist.current.focus()
    }, [url])




    function toggleFavoriteHandler() {
        console.log("add favorite")
        const itemIsFavorite = favoritesCtx.itemIsFavorite(url)


        if (itemIsFavorite) {
            setCurrentFavorite(false)
            favoritesCtx.removeFavorite(url)
            console.log(URL);
            setDisplay(broken)


            // currentFav = false
        } else {
            favoritesCtx.addFavorite(url, title)
            setCurrentFavorite(true)
            setDisplay(heart)

            console.log("check", favoritesCtx.currentToken);

            //check if token is valid so he can continue
            // const token = localStorage.getItem(accessToken)
            // console.log("token", token);

            fetch(`http://localhost:3001/songs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${favoritesCtx.currentToken}`
                },

                body: JSON.stringify({ title: title, url: url, createdBy: favoritesCtx.currentId })
            }).then((response) => (response).json()).then((data) =>
                console.log("saved?", data))




        }
    }

    function inputArtistHandler(event) {
        setInputArtist(event.target.value)
    }

    function inputSongHandler(event) {
        setInputSong(event.target.value)
    }

    function clickHandler() {

        setInputSong("")
        setInputArtist("")
        const keyWord = (artist.current.value + " " + songName.current.value)
        favoritesCtx.addRecent(nowUrl)
        videoSearch(keyWord)
        window.scrollTo({
            top: 300,
            behavior: "smooth"
        });

    }

    return (<>

        <div className='wrapper' >


            <Header />

            <div className="App">
                <h1>MusiXX</h1>
                <Player url={`https://www.youtube.com/watch?v=${url}`} width="100%" playing={false} />
                <div className='heartContainer'>

                    <img className='heart' src={display} onClick={toggleFavoriteHandler} />
                    <Link to="/AllFavorites"><img className='heartCluster' src={cluster} /></Link>

                </div>
                <div className='searchInterface'>
                    <input className="input"
                        ref={artist} value={inputArtist} placeholder='search' />
                    {/* <input className="input" onChange={inputSongHandler}
                        ref={songName} value={inputSong} placeholder='song name' /> */}
                    <button className="click" onClick={clickHandler}>⌕</button>


                </div>
                <div className='recentlyViewed'>receNtly vieWed
                    {/* <h2>receNtly vieWed</h2> */}
                </div>
                <div className='favorites-app'>
                    <Favorites url={`https://www.youtube.com/watch?v=${favoritesCtx.recent[0]}`} width="100%" height="30vh" playing={true} />
                    <Favorites url={`https://www.youtube.com/watch?v=${favoritesCtx.recent[1]}`} width="100%" height="30vh" playing={true} />
                    <Favorites url={`https://www.youtube.com/watch?v=${favoritesCtx.recent[2]}`} width="100%" height="30vh" playing={true} />

                </div>
                <div className='bottomH2'
                    onClick={
                        () => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        }
                    }
                >MusiXX</div>
            </div>

            <Header />

        </div > <div className='AppLogin'>
            <Login />
        </div></>
    );
}

export default Home;


// this works before turn to object

// import './Home.css';
// import react from 'react';
// import { useRef, useState, useContext } from 'react'
// import ReactPlayer from 'react-player/youtube'
// import FavoritesContext from '../../store/Favorites-context';
// import { Link } from 'react-router-dom';

// import Player from '../../components/Player/Player';


// import YTSearch from 'youtube-api-search'



// import Favorites from '../../components/Favorites/Favorites';


// import Header from '../../components/Header/Header';
// import { Route, Switch } from 'react-router-dom'
// import AllFavorites from '../AllFavorites/AllFavorites';




// function Home(props) {
//     const favoritesCtx = useContext(FavoritesContext);
//     const currentFav = { fav: false }
//     // const [currentFavorite, setCurrentFavorite] = useState(false)
//     //check if this is the right parameter, needs to ne the current url
//     const URL = { url: "l0yBFGZQYo0" }
//     const firstRenderIsFavorite = favoritesCtx.itemIsFavorite(URL.url)
//     if (firstRenderIsFavorite) {
//         currentFav.fav = (true)
//     }
//     const artist = useRef("")
//     const songName = useRef("")

//     function videoSearch(term) {
//         YTSearch({ key: "AIzaSyDkzCPPFU6hoflI7xIVOcKLZjgNDLvaT4A", term: term },
//             (videos) => {
//                 setUrl(videos[0].id.videoId)
//                 URL.url = videos[0].id.videoId


//             }
//         )
//     }

//     const [url, setUrl] = useState(URL.url)
//     const [inputArtist, setInputArtist] = useState("")
//     const [inputSong, setInputSong] = useState("")



//     function toggleFavoriteHandler() {
//         console.log("add favorite")
//         const itemIsFavorite = favoritesCtx.itemIsFavorite(URL.url)


//         if (itemIsFavorite) {
//             favoritesCtx.removeFavorite(URL.url)
//             // currentFav = false
//         } else {
//             favoritesCtx.addFavorite(URL.url)
//         }
//     }

//     function inputArtistHandler(event) {
//         setInputArtist(event.target.value)
//     }

//     function inputSongHandler(event) {
//         setInputSong(event.target.value)
//     }

//     function clickHandler() {

//         setInputSong("")
//         setInputArtist("")
//         const keyWord = (artist.current.value + " " + songName.current.value)
//         videoSearch(keyWord)


//     }

//     return (<>

//         <div className='wrapper' >


//             <Header />

//             <div className="App">
//                 <h1>MusiXX</h1>
//                 <Player url={`https://www.youtube.com/watch?v=${url}`} width="100%" playing={false} ref={URL} />
//                 <div className='heartContainer'>
//                     <p className='heart' onClick={toggleFavoriteHandler}>
//                         {currentFav.fav ? "♥" : "♡"
//                         }</p>
//                     <p className='heartCluster'><Link style={{ textDecoration: "none" }} to="/AllFavorites">💕</Link></p>
//                 </div>
//                 <div className='searchInterface'>
//                     <input className="input" onChange={inputArtistHandler}
//                         ref={artist} value={inputArtist} placeholder='artist name' />
//                     <input className="input" onChange={inputSongHandler}
//                         ref={songName} value={inputSong} placeholder='song name' />
//                     <button className="click" onClick={clickHandler}>Search</button>


//                 </div>
//                 <h2>receNtly vieWed</h2>

//                 <div className='favorites-app'>
//                     <Favorites url={`https://www.youtube.com/watch?v=${"ptwt7Fs5INo"}`} width="100%" height="30vh" playing={true} />
//                     <Favorites url={`https://www.youtube.com/watch?v=${"l0yBFGZQYo0"}`} width="100%" height="30vh" playing={true} />
//                     <Favorites url={`https://www.youtube.com/watch?v=${"PhdhxvduVVA&list=RDPhdhxvduVVA&start_radio=1"}`} width="100%" height="30vh" playing={true} />

//                 </div>
//             </div>
//         </div></>
//     );
// }

// export default Home;
