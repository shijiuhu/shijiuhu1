/**
 * 重复字符连续拼接-这种方式比每次减1效率要来的高，方法使用了向右移动一位从而成倍数的str相加
 * @param str 需要重复拼接的字符
 * @param n 重复次数
 * @returns 重复拼接后的字符串
 */
function repeat(str: string, n: number): string {
  let res = ''
  while (n) {
    // eslint-disable-next-line no-magic-numbers
    if (n % 2 === 1) {
      res += str
    }
    if (n > 1) {
      str += str
    }
    n >>= 1
  }
  return res
} 

console.log(repeat('asv', 3))