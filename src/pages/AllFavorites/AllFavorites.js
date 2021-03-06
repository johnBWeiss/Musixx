import "./AllFavorites.css"
import Header from "../../components/Header/Header"
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
    const [optionalFooter, setOptionalFooter] = useState(<div className="noFooter">see what others are watching</div>)



    useEffect(() => {

        if (favoritesCtx.favorites.length == 0) {
            setOptionalFooter(<div className="noFooter">see what others are watching</div>)
        }
        else {
            setOptionalFooter(<Header />)
        }

    }, [])



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

