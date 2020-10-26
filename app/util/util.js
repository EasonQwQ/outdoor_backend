/**
 * 将10进制数字转成62进制字符串
 * @param {*} number
 */
const string10to62 = (number) => {
  // const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  // pAYdf9GEecbqlRUhtHjFxCo5PIzTDrSuiZvNJM63WBmVXsQ0yk2w7LKna48O1g
  const chars = 'pAYdf9GEecbqlRUhtHjFxCo5PIzTDrSuiZvNJM63WBmVXsQ0yk2w7LKna48O1g'.split('');
  const radix = chars.length;
  let quotient = +number;
  const arr = [];
  let mod;
  do {
    mod = quotient % radix;
    quotient = (quotient - mod) / radix;
    arr.unshift(chars[mod]);
  } while (quotient);
  return arr.join('');
};
module.exports = {
  string10to62,
};
