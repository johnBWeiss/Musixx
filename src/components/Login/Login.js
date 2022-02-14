import { useState, useRef, useContext } from "react"
import "./Login.css"
import FavoritesContext from '../../store/Favorites-context';


function Login() {
    const [login, setLogin] = useState(false);
    const [loginDisplay, setLoginDisplay] = useState("")

    const userNameInput = useRef("")
    const passwordInput = useRef("")
    const favoritesCtx = useContext(FavoritesContext);

    let tokeParsed = localStorage.getItem("accessToken")
    console.log(tokeParsed);
    tokeParsed = JSON.parse(tokeParsed)

    const [userLogged, setUserLogged] = useState(favoritesCtx.currentUser)
    function logDisplay(msg, register) {
        setLoginDisplay(msg)
        setTimeout((msg) => {
            setLoginDisplay("")
            if (!register)
                setLogin(!login);


        }, 2000);
    }


    function interfaceHandler() {
        setLogin(!login);
        console.log("login");

    }
    function logOutHandler() {
        localStorage.setItem("accessToken", JSON.stringify([{ accessToken: 0 }, { username: "Guest" }]));
        setUserLogged("Guest")
        favoritesCtx.changeCurrentUser("Guest")
        setLogin(!login);


    }

    function registerHandler() {
        console.log(userNameInput.current, passwordInput.current.value);
        fetch(`http://localhost:3001/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userNameInput.current.value, password: passwordInput.current.value })
        }).then((response) => (response).json()).then((data) => {
            console.log(data);
            logDisplay(`Welcome ${userNameInput.current.value} please sign in`, "register")

        }


        )

    }


    function loginHandler() {
        fetch(`http://localhost:3001/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userNameInput.current.value, password: passwordInput.current.value })
        }).then((response) =>
            (response).json()
        ).then((data, response) => {
            console.log(response);
            console.log(data.message, "message");
            if (data.message === "Invalid credentials") {
                console.log("coolio"); setLoginDisplay(data.message);
                setTimeout(() => {
                    logOutHandler()
                    setLoginDisplay("")
                }, 2000); return
            }
            // if (response.message == "invalid credentials") { alert("invalid"); return }
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
            logDisplay("logged in successfully!")


        })
    }

    return <>        <div className="credentialsInterface">

        <div className="userLogged">hello {userLogged}</div>
        <div className="userLoginInterface">
            <div className="connect" onClick={interfaceHandler}>Connect</div>
            <div className="logOut" onClick={logOutHandler} >Log Out</div>
        </div>

        {/* <div className="LoginMenu"> */}
        <>

            {login ? (
                <div className="dropdownLoginMenu">
                    <input className="userNameInput" placeholder={"user name"} ref={userNameInput} className="usernameInput"></input>
                    <input type="password" placeholder={"password"} className="passwordInput"
                        ref={passwordInput}></input>
                    <div className="registerAndSignIn">
                        <div className="register" onClick={registerHandler}>Register</div>
                        <div className="signIn" onClick={loginHandler}>Sign in</div></div>
                    <div className="loginDisplay">{loginDisplay}</div>

                </div>
            ) : (
                <div></div>
            )}
        </>
        {/* </div> */}
    </div>



    </>
}

export default Login