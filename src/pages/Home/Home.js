import './Home.css';
import { useRef, useState, useContext, useEffect } from 'react'
import FavoritesContext from '../../store/Favorites-context';
import { Link } from 'react-router-dom';
import Player from '../../components/Player/Player';
import YTSearch from 'youtube-api-search'
import Favorites from '../../components/Favorites/Favorites';
import Header from '../../components/Header/Header';
import cluster from "../../images/cluster.png"
import heart from "../../images/heart.png"
import broken from "../../images/broken.png"
import Login from '../../components/Login/Login';



//TODO make the heart be empty when i search again for something that is in the favorites

function Home(props) {


    const favoritesCtx = useContext(FavoritesContext);
    console.log("testing this token", favoritesCtx.currentToken);
    console.log(favoritesCtx.currentId);
    console.log(typeof (favoritesCtx.currentId))

    const [display, setDisplay] = useState(broken)


    const currentFav = { fav: false }
    const nowUrl = favoritesCtx.currentUrl

    console.log(nowUrl);
    const [currentFavorite, setCurrentFavorite] = useState(false)

    const URL = { url: "ptwt7Fs5INo", title: "our last night: you broke me first" }


    const artist = useRef("")

    useEffect(() => {
        {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    }, [])


    function inputHandler(e) {
        setInputArtist(e.target.value)

    }

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

    useEffect(() => {
        const firstRenderIsFavorite = favoritesCtx.itemIsFavorite(favoritesCtx.currentUrl)
        if (firstRenderIsFavorite) {
            setDisplay(heart)
        } else {
            setDisplay(broken)
        }

    }, [url])




    function toggleFavoriteHandler() {
        console.log("add favorite")
        const itemIsFavorite = favoritesCtx.itemIsFavorite(url)


        if (itemIsFavorite) {
            setCurrentFavorite(false)
            favoritesCtx.removeFavorite(url)
            console.log(URL);
            setDisplay(broken)


        } else {
            favoritesCtx.addFavorite(url, title)
            setCurrentFavorite(true)
            setDisplay(heart)

            console.log("check", favoritesCtx.currentToken);

            fetch(`http://localhost:3001/songs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${favoritesCtx.currentToken}`
                },

                body: JSON.stringify({ title: title, url: url, adder: favoritesCtx.currentId, createdBy: favoritesCtx.currentId })
            }).then((response) => (response).json()).then((data) =>
                console.log("saved?", data))

        }
    }


    function clickHandler() {

        const keyWord = (artist.current.value)
        favoritesCtx.addRecent(nowUrl)
        videoSearch(keyWord)
        window.scrollTo({
            top: 300,
            behavior: "smooth"
        });
        setInputArtist("")

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
                        ref={artist} value={inputArtist} placeholder='search' onChange={inputHandler} />

                    <button className="click" onClick={clickHandler}>⌕</button>

                </div>
                <div className='recentlyViewed'>receNtly vieWed
                </div>
                <div className='favorites-app'>
                    <Favorites url={`https://www.youtube.com/watch?v=${favoritesCtx.recent[0]}`} width="100%" height="28vw" playing={true} />
                    <Favorites url={`https://www.youtube.com/watch?v=${favoritesCtx.recent[1]}`} width="100%" height="28vw" playing={true} />
                    <Favorites url={`https://www.youtube.com/watch?v=${favoritesCtx.recent[2]}`} width="100%" height="28vw" playing={true} />

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

