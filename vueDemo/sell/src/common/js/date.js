export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,  // 月
    'd+': date.getDate(),  // 日
    'h+': date.getHours(),  // 时
    'm+': date.getMinutes(),  // 分
    's+': date.getSeconds()  // 秒
  };
  for (let k in o) {    // 其中k表示 o 对象中的每个属性的名字
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str)); // 如果传入的格式是1位，则返回原始值，否则补零。
    }
  }
  return fmt;
};
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

