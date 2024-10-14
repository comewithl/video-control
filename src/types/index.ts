export enum ChormeExtModule {
  CONTENT = 'CONTENT',
  BACKGROUND = 'BACKGROUND',
  POPUP = 'POPUP',
}

export interface VideoConfig extends Record<string, any> {
  /**
   * 播放时间，秒级
   */
  playTime?: number;
  /**
   * 播放速度，1为正常速度
   */
  playSpeed?: number;
}
