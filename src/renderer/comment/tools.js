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

module.exports = {
  formatListenNum
}