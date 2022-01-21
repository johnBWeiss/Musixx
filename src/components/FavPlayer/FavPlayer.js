import ReactPlayer from 'react-player/youtube'
import { useRef, useState } from 'react'

function FavPlayer(props) {
    return <>
        {/* <div className='FavPlayer'></div> */}

        <ReactPlayer
            // ref={blue}

            url={props.url}
            controls
            width={props.width}
            height={props.height}
            playing={props.playing}
        // onPlay={logger}

        // height="504px"
        /></>
}
export default FavPlayer