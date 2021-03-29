import "./App.css";
import React, {useRef,useState,useEffect} from "react";
import Song from "./Component/song";
import data from "./songs.js";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause, } from "@fortawesome/free-solid-svg-icons";
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

function App() {
  const songs= data();
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [nextSong, setNextSong] = useState(songs[1]);
  const [prevSong, setPrevSong] = useState(songs[9]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false)
  const [click,setClick] = useState(0)

  


  const wavesurferRef = useRef();
  const handleWSMount = waveSurfer => {
    wavesurferRef.current = waveSurfer;
    if (wavesurferRef.current) {
      wavesurferRef.current.load(currentSong.audio);
      let click=-1
      wavesurferRef.current.on("ready", () => {
        console.log("WaveSurfer is ready", click);
        setLoading(false)
        click++
        if(click!=0)
        {
        wavesurferRef.current.playPause();
        console.log(wavesurferRef.current.isPlaying())
        setIsPlaying(true)
        }
      });

      wavesurferRef.current.on("loading", data => {
        console.log("loading --> ", data);
        setLoading(data)
      });

      if (window) {
        window.surferidze = wavesurferRef.current;
      }
    }
  }

  const play = () => {
    wavesurferRef.current.playPause();
    setIsPlaying(!isPlaying)
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {      
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      wavesurferRef.current.load(songs[(currentIndex + 1) % songs.length].audio)
      setNextSong(songs[(currentIndex + 2) % songs.length])
      setPrevSong(songs[currentIndex])
      
    }
    if (direction === "skip-back") {
      setCurrentSong(songs[(currentIndex - 1 + songs.length) % songs.length]);
      wavesurferRef.current.load(songs[(currentIndex - 1 + songs.length) % songs.length].audio)
      setNextSong(songs[currentIndex])
      setPrevSong(songs[(currentIndex - 2 + songs.length) % songs.length])
      
    }    
    setIsPlaying(false)
  };


  return (
    <div className={"App"}>
      <Song currentSong={currentSong} prevSong={prevSong} nextSong={nextSong}></Song>
      {loading && <div style={{ width: "80vw", margin: "auto" }}>
        <BorderLinearProgress variant="determinate" value={loading} /></div>}
      <div style={{ textAlign: "center", width: "80vw", margin: "auto" }}>
        <WaveSurfer onMount={handleWSMount} responsive={100}>
          <WaveForm id="waveform"
            barWidth={3}
            barHeight={2}
            barRadius={3}
            height={100}
            barGap={3}
            waveColor='#D9DCFF'
            progressColor='#4353FF'
            cursorColor='white'
            cursorWidth={3}
            responsive={100}
          >
          </WaveForm>
        </WaveSurfer>

      </div>
     {!loading && <div style={{ margin: "auto", display: "flex", width: "30%", padding: "1rem", alignItems: "center", justifyContent: "space-between", marginTop: "30px" }}>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          onClick={play}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
        ></FontAwesomeIcon>
      </div>}
    </div>
  );
}

export default App;
