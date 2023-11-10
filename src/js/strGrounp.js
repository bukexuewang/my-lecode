/**
 *
 * @param {array} list
 * @param {array} res
 * @param {string} cur
 * @param {string} temp
 */
const strGroup = (list, res, cur, temp) => {
  cur += temp;
  const len = list.length;
  if (len === 0) {
    res.push(cur);
    return;
  }

  for (let i = 0; i < len; i++) {
    temp = list.shift();
    strGroup(list, res, cur, temp);
    list.push(temp);
  }

  return [...new Set(res)];
};

const res = strGroup([...'aij'], [], '', '');
console.log(res);
