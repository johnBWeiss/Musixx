import Player from "../Player/Player"
import "./Favorites.css"

function Favorites(props) {
    return <div className="FavoritesPreview">
        <Player url={`https://www.youtube.com/watch?v=${props.url}`}
            playing={false} width={props.width} height={props.height} />
    </div>



}

export default Favorites