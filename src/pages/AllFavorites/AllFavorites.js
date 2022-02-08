import "./AllFavorites.css"
import Header from "../../components/Header/Header"
// import FavHeader from "../../components/Header/FavHeader"
import Player from "../../components/Player/Player"
import Favorites from "../../components/Favorites/Favorites"
import { useContext, useState, useEffect } from "react"
import FavoritesContext from '../../store/Favorites-context';
import FavPlayer from "../../components/FavPlayer/FavPlayer"

function AllFavorites() {

    const favoritesCtx = useContext(FavoritesContext);

    console.log(favoritesCtx.favorites);

    useEffect(() => {
        {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    }, [])

    const [currentFavList, setCurrentFavList] = useState(favoritesCtx.currentUser)

    const [mongoList, setMongoList] = useState([])
    const [optionalFooter, setOptionalFooter] = useState(<div className="noFooter">see what others are watching</div>)


    useEffect(() => {
        fetch(`http://localhost:3001/songs/${favoritesCtx.currentId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).
            then((response) => (response).json()).
            then((data) => {
                console.log("song list?", data); setMongoList((prev) => prev.concat(data)); if (favoritesCtx.currentUser != "Guest") {
                    favoritesCtx.switchAllFavorites(data)
                    if (data.length == 0) {
                        setOptionalFooter(<div className="noFooter">see what others are watching</div>)

                    } else {
                        setOptionalFooter(<Header />)

                    }

                }
            })

    }, [])

    return <div className="FavoritesPageWrapper">
        <Header />
        <div className="favHeadLine">{currentFavList}`s Favorites</div>
        <div className="Tester">
            {favoritesCtx.currentUser == "Guest" ?
                <div className='Container'>
                    {favoritesCtx.favorites.map(url => {
                        return <div className="removeFavoriteTitle" onClick={() => {
                            favoritesCtx.removeFavorite(url.url);
                            //     ()=>{
                            //     fetch(`http://localhost:3001/songs`, {
                            //         method: "POST",
                            //         headers: { "Content-Type": "application/json" },
                            //         body: JSON.stringify({ title: url.title })
                            //     }).then((response) => (response).json()).then((data) =>
                            //         console.log("deleted?", data))
                            // }
                        }}>Remove favorite
                            <div className="favoriteListItem" key={url.url}><div className="urlTitle">{url.title.split("(", 1)}</div></div>

                            {<FavPlayer url={`https://www.youtube.com/watch?v=${url.url}`} width="95%" height="30vh" playing={false} />

                            }
                        </div>
                    })}

                    <div className="widerHeader"> <Header /></div>

                </div> :
                <div className="favoritesContainer">
                    {favoritesCtx.favorites.map(url => {
                        return <div className='Container'>

                            <div className="favoriteListItem" key={url.url}><div className="urlTitle">{url.title.split("(", 1)}</div></div>

                            {<FavPlayer url={`https://www.youtube.com/watch?v=${url.url}`} width="100%" height="30vh" playing={false} />

                            }
                            <div className="removeFavoriteTitle" onClick={
                                () => {
                                    console.log("why not deleting");

                                    fetch(`http://localhost:3001/songs/${url.url}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json", Authorization: `Bearer ${favoritesCtx.currentToken}`
                                        },
                                        // body: JSON.stringify({ title: url.title })
                                    }).then((response) => (response).json()).then((data) => {
                                        favoritesCtx.removeFavorite(url.url);
                                        console.log(data);
                                    })
                                }
                            }>Remove favorite</div>
                        </div>
                    })}



                </div>





            }






            {optionalFooter}

        </div>



    </div>
}

export default AllFavorites;

