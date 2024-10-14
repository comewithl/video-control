const compressing = require('compressing');

function formatDate() {
  const az = (num) => {
    return num < 10 ? `0${num}` : num;
  };
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}${az(month)}${az(day)}${az(hour)}${az(minute)}`;
}

compressing.zip
  .compressDir('dist', `video_control_${formatDate()}.zip`)
  .then(() => {
    console.log('压缩成功！');
  })
  .catch((err) => {
    console.log(err);
  });
