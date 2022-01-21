import "./Header.css";
import { Link } from "react-router-dom";
import AllFavorites from "../../pages/AllFavorites/AllFavorites";
import { useContext, useState } from "react";
import FavoritesContext from "../../store/Favorites-context";

function Header(props) {
  const favoritesCtx = useContext(FavoritesContext);

  return (
    <div className="Header">
      <nav>
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              className="HomeLink"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/AllFavorites"
              className="AllFavoritesLink"
            >
              Favorites
            </Link>
            {/* <span>{favoritesCtx.totalFavorites}</span> */}
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/Blog"
              className="BlogLink"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
