const str = 'laksflfgljsdl;fjjfopasfoojgsodjfasddsaaosodaosfooasfj';

const expandAroundCenter = function (s, l, r) {
  let left = l,
    right = r;
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  // 这里返回的是回文数长度，如果初值l==r，则肯定满足s[l]==s[r]
  // 意味着left与right的差值始终为2n(n为循环执行次数)，但由于
  // 其起始位置字符串数为1，因此真实长度应当为2n-1,因此返回
  // right-left-1。如果初值l+1==right,其起始位置字符串数为0
  // 因此真实长度应当为2n-2,由于初值补足1，因此返回right-left-1即可
  return right - left - 1;
};

// const len = expandAroundCenter('aabbaa', 2, 3);
// console.log(len);

// 判断字符串是否为回文字符串
const isPalindrome = function (s) {
  if (!s) return false;
  if (s === 1) return true;
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
};

isPalindrome('abc');
