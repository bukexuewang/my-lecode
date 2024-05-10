// 反转链表真题
// 反转一个单链表。
// 示例:
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
// 进阶:
// 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
// 链接：https://leetcode-cn.com/problems/reverse-linked-list
// 生成一个链表
function ListNode(val) {
  this.val = val;
  this.next = null;
}
function createList(arr) {
  let head = new ListNode(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}
// 打印链表
function printList(head) {
  let cur = head;
  let res = [];
  while (cur) {
    res.push(cur.val);
    cur = cur.next;
  }
  console.log(res);
}

const head = createList([1, 2, 3, 4, 5]);

const reverseList = (head) => {
  let pre = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};
printList(reverseList(head));
