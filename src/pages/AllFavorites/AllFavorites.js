import "./AllFavorites.css"
import Header from "../../components/Header/Header"
import Player from "../../components/Player/Player"
import Favorites from "../../components/Favorites/Favorites"
import { useContext, useState, useEffect } from "react"
import FavoritesContext from '../../store/Favorites-context';
import FavPlayer from "../../components/FavPlayer/FavPlayer"
import axios from "axios"
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
    const [optionalFooter, setOptionalFooter] = useState(<div className="noFooter">see what others are watching</div>)


    // useEffect(() => {
    //     fetch(`http://localhost:3001/songs/${favoritesCtx.currentId}`, {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" }
    //     }).
    //         then((response) => (response).json()).
    //         then((data) => {
    //             console.log("song list?", data); if (favoritesCtx.currentUser != "Guest") {
    //                 favoritesCtx.switchAllFavorites(data)
    //                 if (data.length == 0) {
    //                     setOptionalFooter(<div className="noFooter">see what others are watching</div>)

    //                 } else {
    //                     setOptionalFooter(<Header />)
    //                 }
    //             }
    //         })

    // }, [])

    useEffect(() => {


        if (favoritesCtx.favorites.length == 0) {
            setOptionalFooter(<div className="noFooter">see what others are watching</div>)
        }
        else {
            setOptionalFooter(<Header />)
        }

    }, [])

    async function car() {
        console.log("car");
        const data = await axios.get('https://www.find-car.co.il/car/private/7493833')
        console.log(data.data);
    }
    car()


    return <div className="FavoritesPageWrapper">
        <Header />
        <div className="favHeadLine">{currentFavList}`s Favorites</div>
        <div className="Tester">
            {favoritesCtx.currentUser == "Guest" ?
                <div className="favoritesContainer">
                    {favoritesCtx.favorites.map(url => {

                        return <div className='Container'>

                            <div className="favoriteListItem" key={url.url}><div className="urlTitle">{url.title.split("(", 1)}</div></div>

                            {<FavPlayer url={`https://www.youtube.com/watch?v=${url.url}`} width="100%" height="30vh" playing={false} />

                            }
                            <div className="removeFavoriteTitle" onClick={
                                () => {
                                    favoritesCtx.removeFavorite(url.url);

                                }
                            }>Remove favorite</div>
                        </div>
                    })}

                </div>

                :

                <div className="favoritesContainer">
                    {favoritesCtx.favorites.map(url => {
                        return <div className='Container'>

                            <div className="favoriteListItem" key={url.url}><div className="urlTitle">{url.title.split("(", 1)}</div></div>

                            {<FavPlayer url={`https://www.youtube.com/watch?v=${url.url}`} width="100%" height="30vh" playing={false} />

                            }
                            <div className="removeFavoriteTitle" onClick={
                                () => {
                                    favoritesCtx.removeFavorite(url.url);
                                    console.log(favoritesCtx.favorites);
                                    if (favoritesCtx.favorites.length == 1) {
                                        setOptionalFooter(<div className="noFooter">see what others are watching</div>)
                                    }
                                    fetch(`http://localhost:3001/songs/${url.url}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json", Authorization: `Bearer ${favoritesCtx.currentToken}`
                                        },
                                        body: JSON.stringify({ title: url.title, adder: favoritesCtx.currentId })
                                    }).then((response) => (response).json()).then((data) => {
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

