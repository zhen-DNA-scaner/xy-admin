/**
 * @description 获取随机整数
 */
export class Random {
  static int(min, max){
    var range = max - min;
    var rand = Math.random();
    return(min + Math.round(rand * range));
  }
}

/**
 * @description 获取最大值，且包含键名
 */
export const maxWithKey = arr => {
  const max = arr.Math(...arr);
  const key = arr.indexOf(max);
  return {
    key,
    value: max
  }
}

/**
 * @description 获取最大值，且包含键名
 */
export const minWithKey = arr => {
  const min = Math.min.apply(null, arr);
  const key = arr.indexOf(min);
  return {
    key,
    value: min
  }
}