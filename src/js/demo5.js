// 三数之和
function threeSum(nums) {
  let res = [];
  let len = nums.length;
  if (nums == null || len < 3) return res;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        res.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      } else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return res;
}

// 写出一个正则，匹配邮箱
function isEmail(str) {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return reg.test(str);
}

// 写出一个动态规划的算法题
// 输入：s = "babad" 输出："bab" 解释："aba"
let longestPalindrome = function (s) {
  if (!s || s.length < 1) return '';
  let start = 0,
    end = 0;
  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - parseInt((len - 1) / 2);
      end = i + parseInt(len / 2);
    }
  }
  return s.substring(start, end + 1);
};

function expandAroundCenter(s, left, right) {
  let L = left,
    R = right;
  while (L >= 0 && R < s.length && s.charAt(L) == s.charAt(R)) {
    L--;
    R++;
  }
  return R - L - 1;
}

// 贪心算法
// 一组区间，选出最多不重叠的区间
function eraseOverlapIntervals(intervals) {
  if (intervals.length == 0) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 1;
  let end = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < end) continue;
    end = intervals[i][1];
    count++;
  }
  return intervals.length - count;
}

// 利用promise封装fetch
function myFetch(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 利用promise封装xhr
function myXhr(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.send();
  });
}
