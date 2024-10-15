import { useEffect, useState } from 'react';
import './App.css';
import { VideoConfig } from './types';
import { getValueFromStorage, setValueFromStorage } from './utils';
import { VideoDefaultControlConfig } from './types/constant';

function App() {
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({});
  const [location, setLocation] = useState<Pick<Location, 'hostname'>>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length) {
        const tab = tabs[0];
        if (tab.url) {
          const loc = new URL(tab.url);
          setLocation({
            hostname: loc.host,
          });
          getValueFromStorage([loc.hostname], (s) => {
            setVideoConfig(Object.assign({}, VideoDefaultControlConfig, s[loc.hostname]||{}));
            setLoaded(true);
          });
        }else{
          setLoaded(true);
          setLocation({
            hostname: 'normal',
          })
        }
      }
    });
    // chrome.runtime.sendMessage({ type: 'getLocation' }).then((loc) => {
    //   if (loc) {
    //     setLocation(loc);
    //     getValueFromStorage([loc.hostname], (s) => {
    //       setVideoConfig(Object.assign({}, VideoDefaultControlConfig, s[loc.hostname]||{}));
    //       setLoaded(true);
    //     });
    //   }else{
    //     setLoaded(true);
    //     setLocation({
    //       hostname: 'normal',
    //     })
    //   }
    // });
  }, []);

  if (!loaded) {
    return <span>loading...</span>;
  }
  return (
    <>
      <div>
        <label htmlFor="playTime">视频播放时间</label>
        <input
          defaultValue={videoConfig.playTime}
          name="playTime"
          type="number"
          onBlur={(e) => {
            setVideoConfig({ ...videoConfig, playTime: Number(e.target.value) });
          }}
        />
        <label htmlFor="playSpeed">视频播放速度</label>
        <input
          defaultValue={videoConfig.playSpeed}
          name="playSpeed"
          type="number"
          onBlur={(e) => {
            setVideoConfig({ ...videoConfig, playSpeed: Number(e.target.value) });
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            if (location) {
              setValueFromStorage({[location.hostname]: videoConfig});
            }
          }}
        >
          保存
        </button>
      </div>
    </>
  );
}

export default App;
