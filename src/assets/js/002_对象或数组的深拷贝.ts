/**
 * 深拷贝，属性对应的是对象则嵌套调用自己，否则给上新对象
 * @param obj 要拷贝的对象或数组
 * @returns 
 */
export const deepClone = obj => {
  if (typeof obj !== 'object')
    return obj
  const newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      newObj[key] = deepClone(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}