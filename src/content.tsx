import { VideoDefaultControlConfig, ConfigKey } from './types/constant';
import { getValueFromStorage } from './utils';

(function () {
  const config = VideoDefaultControlConfig;
  const configKey = ConfigKey;
  function loadVideoControlConfig(cb: () => void) {
    // 从localStorage中获取配置
    getValueFromStorage([configKey], (value) => {
      Object.assign(config, value[configKey]);
      cb();
    });
  }

  chrome.storage.onChanged.addListener(function (changes) {
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (configKey === key) {
        Object.assign(config, newValue || {});
      }
    }
  })

  // chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  //   if (message.type === 'getLocation') {
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       const tab = tabs[0];
  //       if (tab.url) {
  //         const location = new URL(tab.url);
  //         console.log('【Video Control】location', location);
  //         configKey = location.host;
  //         sendResponse({
  //           href: location.href,
  //           host: location.host,
  //           pathname: location.pathname,
  //           search: location.search,
  //           hash: location.hash,
  //         });
  //       } else {
  //         sendResponse(null);
  //       }
  //     });
  //     return true; // 表示异步响应
  //   }
  // });

  
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
    const changePlayTime = ()=>{
      if(config.playTime && !Number.isNaN(video.duration) && video.duration!=Infinity && video.duration>config.playTime){
        video.currentTime = config.playTime;
      }
    }
    changePlayTime();
    if(!video.getAttribute('moutLoad')){
      video.addEventListener('loadeddata', function () {
        changePlayTime();
      })
      video.setAttribute('moutLoad', 'true');
    }
  }
})();
