/**
 * 格式化听歌量
 */
function formatListenNum(num) {
  if (num > 100) {
    if (num > 9999) {
      num = `${parseFloat(num / 10000, 10).toFixed(1)}万`;
    }
  } else {
    num = 0;
  }
  return num;
}

/**
 * 格式化歌曲时长
*/
const mFormat = (m) => {
  const sec = Math.floor(m / 60);
  const second = sec > 9 ? sec : '0' + sec;
  const min = Math.floor(m % 60);
  const minute = min > 9 ? min : '0' + min;
  return second + ':' + minute;
}

module.exports = {
  formatListenNum,
  mFormat
}