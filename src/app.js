import React from 'react';
import ReactDOM from 'react-dom';

const firstSoundsGroup = [
    {
      keyCode: 81,
      key: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      key: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      key: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      key: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      key: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

const secondSoundsGroup = [
    {
      keyCode: 81,
      key: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      key: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      key: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      key: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      key: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsGroup = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup
};

const KeyboardKeys = ({ play, sound: { id, key, url, keyCode }}) => {
  const handleKeydown = (e) => {
    if (e.keyCode === keyCode) {
      play(key, id);
    }
  }
  
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
  }, [])
  
  return (<button 
             id="drum" 
             className="drum-pad"
             onClick={() => play(key, id)}>
      <audio id={key} className="clip" src={url} />
      {key}
    </button>)
}

const Keyboard = ({ power, play, sounds }) => (
  <div className="keyboard">
    {power 
      ? sounds.map((sound) => <KeyboardKeys sound={sound} play={play} />)
      : sounds.map((sound) => <KeyboardKeys sound={{...sound, url: "#" }} play={play} />)        
    }
  </div>
);

const DrumControl = ({ power, volume, name, turn, handleVolumeChange, changeSoundGroup }) => {
  return <div className="controls">
    <button id="power" onClick={turn}>Turn Power {power ? "OFF" : "ON"}</button>
    <input 
      min="0"
      max="1"
      step="0.01"
      type="range"
      value={volume}
      onChange={handleVolumeChange}
      />
    <h2 id="display">{name}</h2>
    <button onClick={changeSoundGroup}>Change Sound Group</button>
  </div>
}

const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState("");
  const [soundsType, setSoundsType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundsType]);

  const activeKey = (audio) => {
    audio.parentElement.style.backgroundImage = "linear-gradient(45deg, #0b277b, #4a6eaa, #58a4e1)";
    audio.parentElement.style.color = "#fff";
  };

  const deactiveKey = (audio) => {
    setTimeout(() => {
      audio.parentElement.style.backgroundImage = "none";
      audio.parentElement.style.color = "#000";
    }, 300);
  };
  
  const play = (key, sound) => {
    setSoundName(sound);
    const audio = document.getElementById(key);
    activeKey(audio);
    audio.currentTime = 0;
    audio.play();
    deactiveKey(audio);
  }
  
  const turn = () => {
    setPower(!power)
  }
  
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  }
  
  const setSoundVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.key));
    audios.forEach(audio => {
      if (audio) {
        audio.volume = volume;
      }
    });
  }
  
  const changeSoundGroup = () => {
    setSoundName("")
    if(soundsType === "heaterKit"){
        setSoundsType("smoothPianoKit");
        setSounds(soundsGroup.smoothPianoKit);
    } else {
        setSoundsType("heaterKit");
        setSounds(soundsGroup.heaterKit);
    }
  }
  
  return <div id="drum-machine">
    {setSoundVolume()}
    <Keyboard play={play} sounds={sounds} power={power} />
    <DrumControl
      power={power}
      turn={turn}
      volume={volume}
      handleVolumeChange={handleVolumeChange}
      name={power ? soundName || soundsName[soundsType] : soundsName[soundsType]} 
      changeSoundGroup={changeSoundGroup} 
      />
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'));