import { useContext, useEffect, useState } from 'react';
import './App.css';
import ListMusic from './ListMusic/ListMusic';
import Menu from './Menu/Menu';
import Player_Test from './Player/Player-Test';
import Playlist from './Playlist/Playlist';
import { MusicProvider, useMusic } from './Context/MusicContext';
import songList from "./artist.json"
function App() {
  const [songs, setSongs] = useState(songList.songs);
  const [playerKey, setPlayerKey] = useState(0);
  const { musicas, setMusicas, musicaTocando, musicaIndex, tocarMusica, pararMusica, setCurrentIndex, } = useMusic();
  const [musicasClicada , setMusicaClicada] = useState(null)




  const handleSongClick = async (index) => {
    setMusicaClicada(index)
    setMusicas(songList.songs)
    
  };

  const queue =  (index) => {
    let controlMusic =[...musicas];
    controlMusic.push(songList.songs[index])
    setMusicas(controlMusic);
  }

  useEffect(() => {
    if(musicas && musicasClicada !== null){
      tocarMusica(musicasClicada)
      setMusicaClicada(null);
    }
   
  }, [musicas, musicasClicada]);


  useEffect(() => {

    console.log(musicas)
  }, [musicas])


  return (
    <>
      <div className='body'>
        <div className='top'>
          <Playlist></Playlist>

          {songs.map((song, index) => (
            <ListMusic key={index} song={song.song} onContextMenu={window.alert} onClick={() => handleSongClick(index)} onMenu={() => {queue(index)}}  />
          ))}
        </div>
        <div className='bottom'>
        


          {musicaTocando && <Player_Test />}
          <Menu></Menu>
        </div>
      </div>
    </>
  );
}

export default App;
