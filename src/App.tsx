import { useEffect, useState } from 'react';
import './App.css';
import { VideoConfig } from './types';
import { getValueFromStorage, setValueFromStorage } from './utils';
import { StorageMap, VideoDefaultControlConfig } from './types/constant';

function App() {
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getValueFromStorage(StorageMap.videoConfig, (s) => {
      setVideoConfig(Object.assign({}, VideoDefaultControlConfig, s));
      setLoaded(true);
    });
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
            setVideoConfig({ ...videoConfig, playTime: Number(e.target.value) });
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            setValueFromStorage(videoConfig);
          }}
        >
          保存
        </button>
      </div>
    </>
  );
}

export default App;
