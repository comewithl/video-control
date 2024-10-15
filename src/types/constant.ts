import { VideoConfig } from './index';

export const VideoDefaultControlConfig: VideoConfig = {
  playSpeed: 1,
  playTime: 0,
};

export const StorageMap = {
  videoConfig: Object.keys(VideoDefaultControlConfig),
};


export const ConfigKey = location.hostname || 'normal';