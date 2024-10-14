import { StorageMap, VideoDefaultControlConfig } from './types/constant';
import { getValueFromStorage } from './utils';

(function () {
  let config = VideoDefaultControlConfig;
  function loadVideoControlConfig(cb: () => void) {
    // 从localStorage中获取配置
    getValueFromStorage(StorageMap.videoConfig, (value) => {
      Object.assign(config, value);
      cb();
    });
  }
  loadVideoControlConfig(function () {
    // 获取所有视频元素
    const videos = document.getElementsByTagName('video');
    console.log('【Video Control】videos', videos);
    // 遍历视频元素
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];

      handleVideoPlay(video);
    }

    document.addEventListener('DOMContentLoaded', function () {
      const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const newVideos = mutation.addedNodes;
            newVideos.forEach((node) => {
              if (node.tagName === 'VIDEO') {
                handleVideoPlay(node);
              }
            });
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  });
  function handleVideoPlay(video: HTMLVideoElement) {
    if (!video) return;
    video.currentTime = config.playTime || 0;
    video.play();
  }
})();
