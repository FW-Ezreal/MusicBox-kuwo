/**
 * 格式化听歌量
 */
function formatListenNum (num) {
  if (num > 100) {
    if (num > 9999) {
      num = `${parseFloat(num / 10000, 10).toFixed(1)}万`
    }
  } else {
    num = 0
  }
  return num
}

/**
 * 格式化数量， 万
 */
function formatNum (num) {
  if (num > 9999) {
    num = `${parseFloat(num / 10000, 10).toFixed(1)}万`
  }
  return num || 0
}

/**
 * 格式化歌曲时长
*/
const mFormat = (m) => {
  const sec = Math.floor(m / 60)
  const second = sec > 9 ? sec : '0' + sec
  const min = Math.floor(m % 60)
  const minute = min > 9 ? min : '0' + min
  return second + ':' + minute
}

/**
 * 获取某个字符串中 key对应的value getValue("xxx?a=b","a")=b
 * @param {string} url - 要取值的字符串
 * @param {string} type - 按什么分割的 & | ;
 * @param {string} key - key值
 */
function getValue(url, type, key) {
  let value = '';
  const begin = url.indexOf(key + '=');
  if (begin >= 0) {
    let tmp = url.substring(begin + key.length + 1);
    const eqIdx = tmp.indexOf('=');
    let end = 0;
    if (eqIdx >= 0) {
      tmp = tmp.substring(0, eqIdx);
      end = tmp.lastIndexOf(type);
    } else {
      end = tmp.length;
    }
    if (end >= 0) {
      try {
        value = decodeURIComponent(tmp.substring(0, end));
      } catch (e) {
        value = tmp.substring(0, end);
      }
    } else {
      try {
        value = decodeURIComponent(tmp);
      } catch (e) {
        value = tmp;
      }
    }
  }
  return value;
}

module.exports = {
  formatListenNum,
  mFormat,
  formatNum,
  getValue
}
