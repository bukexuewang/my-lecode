const msg = {
  fxMsgType: 'FX_BUSINESS_MORNING_PAPER',
  msgBubble: 'GroupRankMorningPaper',
  visible: true,
  localization: true,
  selected: false
};
const abcProxy = new Proxy(msg, {
  get(target, key, receive) {
    return target[key];
  },
  set(target, key, value, receiver) {
    target[key] = value;
    return true;
  }
});

abcProxy.visible = false;

console.log('msg', msg.visible);
