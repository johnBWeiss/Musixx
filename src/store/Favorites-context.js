import { createContext, useState } from "react";
// localStorage.setItem("accessToken", JSON.stringify([{ accessToken: 0 }, { username: "Guest" }]))
let tokeParsed = localStorage.getItem("accessToken")
    ;


if (tokeParsed === null || JSON.parse(tokeParsed).message == "Invalid credentials") {
    localStorage.setItem("accessToken", JSON.stringify([{ accessToken: 0 }, { username: "Guest", _id: 0 }]))
    tokeParsed = localStorage.getItem("accessToken")


}
tokeParsed = localStorage.getItem("accessToken")

tokeParsed = JSON.parse(tokeParsed)





console.log(tokeParsed);
// console.log(tokeParsed[0].accessToken);
// console.log(tokeParsed[1].username);


const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: "",
    removeFavorite: "",
    itemIsFavorite: ""

});

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([])
    const [current, setCurrent] = useState("F5tSoaJ93ac")
    // const [recent, setRecent] = useState(["l0yBFGZQYo0", "ptwt7Fs5INo", "hQy_S9p1FwM&list=RDPhdhxvduVVA&index=5"])
    const [recent, setRecent] = useState(["l0yBFGZQYo0", "ptwt7Fs5INo", "hQy_S9p1FwM&list=RDPhdhxvduVVA&index=5"])
    const [currentUser, setCurrentUser] = useState(tokeParsed[1].username)
    const [currentId, setCurrentId] = useState(tokeParsed[1]._id)
    const [currentToken, setCurrentToken] = useState(tokeParsed[0].accessToken)


    function addRecentHandler(url) {
        setRecent((prev) => [url, ...prev])
    }

    function currentHandler(url) {
        setCurrent(url)

    }

    function addFavoriteHandler(url, title) {
        setUserFavorites((prevState) => [{ url: url, title: title }, ...prevState])
    }

    function removeFavoriteHandler(url) {
        setUserFavorites((prevState) => prevState.filter(key => key.url !== url))
    }

    function itemIsFavoriteHandler(url) {
        return userFavorites.some(key => key.url === url)
    }

    function changeCurrentUserHandler(currentUser) {
        setCurrentUser(currentUser)

    }

    function changeCurrentIdHandler(id) {
        setCurrentId(id)

    }

    function changeCurrentTokenHandler(token) {
        setCurrentToken(token)

    }

    function switchAllFavoritesHandler(newFavorites) {
        setUserFavorites([...newFavorites])
    }


    const context = {
        favorites: userFavorites,
        recent: recent,
        addRecent: addRecentHandler,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler,
        switchAllFavorites: switchAllFavoritesHandler,
        currentUrl: current,
        changeCurrentUrl: currentHandler,
        currentUser: currentUser,
        currentToken: currentToken,
        changeCurrentToken: changeCurrentTokenHandler,
        changeCurrentUser: changeCurrentUserHandler,
        currentId: currentId,
        changeCurrentId: changeCurrentIdHandler,

    }


    return <FavoritesContext.Provider value={context}>
        {props.children}

    </FavoritesContext.Provider>
}

export default FavoritesContext

