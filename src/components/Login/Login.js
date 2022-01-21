import { useState, useRef, useContext } from "react"
import "./Login.css"
import FavoritesContext from '../../store/Favorites-context';


function Login() {

    const [login, setLogin] = useState(false);
    const userNameInput = useRef("")
    const passwordInput = useRef("")
    const favoritesCtx = useContext(FavoritesContext);

    let tokeParsed = localStorage.getItem("accessToken")
    console.log(tokeParsed);
    tokeParsed = JSON.parse(tokeParsed)
    // console.log(tokeParsed[0].accessToken);
    // console.log(tokeParsed[1].username);
    // console.log(tokeParsed[1]._id);
    // console.log(tokeParsed[1]);





    // setUserLogged(tokeParsed[1].username)

    const [userLogged, setUserLogged] = useState(favoritesCtx.currentUser)
    // const [userLogged, setUserLogged] = useState("")


    function interfaceHandler() {
        setLogin(!login);
        console.log("login");

    }
    function logOutHandler() {
        localStorage.setItem("accessToken", JSON.stringify([{ accessToken: 0 }, { username: "Guest" }]));
        setUserLogged("Guest")
        favoritesCtx.changeCurrentUser("Guest")
    }

    // function signUpHandler() {
    //     setLogin(!login);
    //     console.log("login");

    // }
    // function click(e) {
    //     console.log(e.target.value);

    // }

    function registerHandler() {
        console.log(userNameInput.current, passwordInput.current.value);
        fetch(`http://localhost:3001/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userNameInput.current.value, password: passwordInput.current.value })
        }).then((response) => (response).json()).then((data) =>
            console.log(data.username))
        // setLogin(!login);


    }

    function loginHandler() {
        fetch(`http://localhost:3001/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userNameInput.current.value, password: passwordInput.current.value })
        }).then((response) => (response).json()).then((data) => {
            console.log(data);
            localStorage.setItem("accessToken", JSON.stringify(data));
            let tokeParsed = localStorage.getItem("accessToken")
            tokeParsed = JSON.parse(tokeParsed)
            console.log(tokeParsed[0].accessToken);
            console.log(tokeParsed[1].username);
            console.log(tokeParsed[1]._id);


            favoritesCtx.changeCurrentUser(tokeParsed[1].username)
            favoritesCtx.changeCurrentId(tokeParsed[1]._id)
            favoritesCtx.changeCurrentToken(tokeParsed[0].accessToken)


            setUserLogged(tokeParsed[1].username)
        })
        setLogin(!login);
    }



    return <>
        <div className="userLogged">hello {userLogged}</div>
        <div className="credentialsInterface">
            <div className="connect" onClick={interfaceHandler}>Connect</div>
            <div className="logOut" onClick={logOutHandler} >Log Out</div>

            {/* <div className="signUp" onClick={signUpHandler}>
            Signup
        </div> */}
            {/* <div className="Login" onClick={loginHandler}>
            Login
        </div> */}
        </div>
        <div className="LoginMenu">
            {login ? (
                <>
                    <input className="userNameInput" placeholder={"user name"} ref={userNameInput} className="usernameInput"></input>
                    <input placeholder={"password"} className="passwordInput"
                        ref={passwordInput}></input>
                    <div className="registerAndSignIn">
                        <div className="register" onClick={registerHandler}>Register</div>
                        <div onClick={loginHandler}>Sign in</div></div>

                </>
            ) : (
                <div></div>
            )}
        </div>


    </>
}

export default Login