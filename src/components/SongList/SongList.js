import React from "react";

function SongList(props) {

  return <div>

    {
      props.songz.map(({ id, name, artist }) => (
        <p key={id}>{id}   {name}   {artist}</p>))}

  </div>

}

export default SongList;
