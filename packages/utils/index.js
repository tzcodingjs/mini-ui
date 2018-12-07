/*
 * @Description: utils function
 * @Author: tz
 * @Date: 2018-12-07 10:28:16
 * @LastEditTime: 2018-12-07 10:30:08
 * @LastEditors: tz
 */

function isObj(o){
  const type = typeof o;
  return o !== null && (type === 'object' || type === 'function')
}

export {
  isObj
}
