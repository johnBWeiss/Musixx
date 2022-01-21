import ReactPlayer from 'react-player/youtube'
import { useRef, useState } from 'react'

function Player(props) {
    return <ReactPlayer
        // ref={blue}

        url={props.url}
        controls
        width={props.width}
        height={props.height}
        playing={props.playing}
    // onPlay={logger}

    // height="504px"
    />
}
export default Player