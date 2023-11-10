// import fs from 'fs'
// import xlsx from 'node-xlsx'
import data from './data.js'

const aboutUs = {
  contactUs: '联系我们',
  about: {
    title: '关于我们',
    intro:
      'TradingLive作为全球首个多语言金融学习直播社区，旨在让投资学习更高效，知识分享更便捷。\n      \n      TradingLive以金融直播、视频、文章为内容载体，覆盖外汇、股票和数字货币等多元知识领域。全球各地的金融讲师汇聚在TradingLive，利用自身的专业知识减少投资者的信息壁垒，并赚取创作收益。\n      \n      TradingLive致力于服务每个人的金融投资学习，目前网页和APP端的语言版本已覆盖英文、中文、越南语、泰语和阿拉伯语，希望通过不断拓展业务范围以满足全球用户需求。'
  },
  brandStory: {
    title: '品牌故事',
    intro:
      'TradingLive是从Forexway这个外汇教育平台发展起来的。当时，我们试图通过简单易懂的系统课程教育投资者，帮助他们建立自己的投资知识体系。\n\n      一个重要的发现是，这种传统模式没有互动，投资者只是被动地接受知识。在这个领域获得成功的投资者的故事、学习经验和成长经历并没有有效地被其他人听到，而这个领域的初学者却要花很多时间去寻找合适的学习材料。因此，TradingLive想做的是提供一座桥梁，将导师和学习者联系在一起! \n      \n      从Forexway到TradingLive，我们试图通过产品设计和平台政策加强导师和学习者之间的互动。我们在TradingLive上推出了一系列新功能，包括直播，以促进导师和学习者之间的联系。为了给用户提供更好的社区和完善的功能，我们强大的技术团队提出了新的假设，并一次又一次地将其推倒。同时，我们制定了一系列的支持政策，以此来吸引更多优秀的金融创作者加入TradingLive，生产更多的优质内容。'
  },
  live: { title: '直播', intro: '让投资学习更高效' },
  shortVideoShooting: { title: '短视频', intro: '随时随地开启拍摄，分享投资观点' },
  globalMentors: { title: '全球讲师', intro: '汇聚全球金融讲师' },
  wonderfulFinancialVideos: { title: '精彩视频', intro: '让知识分享更便捷' },
  selectedEBooks: { title: '精选电子书', intro: '聚合全球金融资讯' },
  events: { title: '展会活动', intro: '参加TradingLive展会活动，提升公司品牌知名度' },
  ourPartners: { title: '合作伙伴', intro: '品牌曝光' },
  downloadApp: { title: '下载App', intro: '立即加入金融直播社区' },
  scanAppText: '扫码下载TradingLive App',
  business: '商务合作',
  followUs: '关注我们',
  feedback: '意见反馈'
}

const list = []
const dfs = (obj, key = 'aboutUs') => {
  if (typeof obj !== 'object') return
  Object.entries(obj).forEach(([objKey, value]) => {
    const mergeKey = `${key}_${objKey}`
    if (typeof value === 'object') return dfs(value, mergeKey)
    list.push({ key: mergeKey, value })
  })
}

// dfs(aboutUs)

// console.log(list)

const abc = [
  'https://www.trading.live/en/Daniel%7CFastBull/video/6594',
  'https://www.trading.live/en/IdrisTabrizi/video/6786',
  'https://www.trading.live/en/ChandanGupta/video/5636',
  'https://www.trading.live/en/thinkmore/video/4145',
  'https://www.trading.live/en/Daniel%7CFastBull/video/4851',
  'https://www.trading.live/en/DevinWang/video/5918',
  'https://www.trading.live/en/MohammadOmar/video/3522',
  'https://www.trading.live/en/DevinWang/video/5480',
  'https://www.trading.live/cn/%E6%82%A6%E5%8D%8E%E9%87%91%E8%9E%8D%E4%BA%A4%E6%98%93%E5%9F%B9%E8%AE%AD/video/1127',
  'https://www.trading.live/cn/KingsleyTan/video/923',
  'https://www.trading.live/cn/%E8%83%96%E6%9D%BE%E8%AF%B4%E6%B1%87/video/1134',
  'https://www.trading.live/cn/%E6%9D%83%E5%93%A5%E8%AE%B2a%E8%82%A1/video/6214',
  'https://www.trading.live/cn/%E6%9D%8E%E8%90%BD%E6%BA%AA/video/3504',
  'https://www.trading.live/cn/thinkmore/video/5957',
  'https://www.trading.live/cn/%E6%B5%A9%E6%8A%95%E8%B5%84/video/4534',
  'https://www.trading.live/cn/%E6%9C%89%E5%B2%B8Leon/video/3884',
  'https://www.trading.live/tw/KeoniChuang/video/992',
  'https://www.trading.live/tw/Lewis%E5%B0%8F%E8%B7%AF/video/982',
  'https://www.trading.live/tw/%E5%BA%B7%E5%B8%9DKanDi/video/3209',
  'https://www.trading.live/tw/vision%E4%BA%A4%E6%98%93%E5%B7%A5%E4%BD%9C%E5%AE%A4a/video/6729',
  'https://www.trading.live/tw/tradinglive/video/5173',
  'https://www.trading.live/tw/Lewis%E5%B0%8F%E8%B7%AF/video/1119',
  'https://www.trading.live/tw/KeoniChuang/video/998',
  'https://www.trading.live/tw/ding%E5%A7%90%E5%A7%90/video/6815',
  'https://www.trading.live/vn/V%C3%95TI%C3%8ANSANH/video/1131',
  'https://www.trading.live/vn/V%C3%95TI%C3%8ANSANH/video/1404',
  'https://www.trading.live/vn/V%C3%95TI%C3%8ANSANH/video/3712',
  'https://www.trading.live/vn/V%C3%95TI%C3%8ANSANH/video/3533',
  'https://www.trading.live/vn/Nguy%E1%BB%85nTh%C3%A0nhL%E1%BB%A3i/video/3093',
  'https://www.trading.live/vn/Nguy%E1%BB%85nTh%C3%A0nhL%E1%BB%A3i/video/4150',
  'https://www.trading.live/vn/Nguy%E1%BB%85nTh%C3%A0nhL%E1%BB%A3i/video/3921',
  'https://www.trading.live/vn/Nguy%E1%BB%85nTh%C3%A0nhL%E1%BB%A3i/video/4192',
  'https://www.trading.live/en/Daniel%7CFastBull/video/6594',
  'https://www.trading.live/en/IdrisTabrizi/video/6786',
  'https://www.trading.live/en/ChandanGupta/video/5636',
  'https://www.trading.live/en/thinkmore/video/4145',
  'https://www.trading.live/en/Daniel%7CFastBull/video/4851',
  'https://www.trading.live/en/DevinWang/video/5918',
  'https://www.trading.live/en/MohammadOmar/video/3522',
  'https://www.trading.live/en/DevinWang/video/5480',
  'https://www.trading.live/ar/%D8%B3%D8%A7%D9%85%D8%B1%20%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A/video/7004',
  'https://www.trading.live/ar/majde%20belal%20nouri/video/6600',
  'https://www.trading.live/ar/majde%20belal%20nouri/video/6107',
  'https://www.trading.live/ar/majde%20belal%20nouri/video/6460',
  'https://www.trading.live/ar/%D8%B3%D8%A7%D9%85%D8%B1%20%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A/video/6742',
  'https://www.trading.live/en/warren/video/7003',
  'https://www.trading.live/en/IdrisTabrizi/video/6786',
  'https://www.trading.live/en/Daniel%7CFastBull/video/4851',
]

const extractId = (arr) => {
  return arr.map(str => +str.match(/\d+$/)[0])
}
// console.log(abc.length)
// console.log(extractId(abc))






// en,cn,tw,vn,ty,ar
const langList = [3, 12, 2, 10, 9, 4]
const lens = [8, 8, 8, 8, 8, 8]
const sortCon = () => {
  const dataMap = data.reduce((res, item, i) => (res[item.id] = item, res), {})
  const ids = extractId(abc)
  const res = []
  ids.forEach((id, i) => {
    const item = dataMap[id]
    res[i] = item
  })
  const resMap = {}
  let preI = 0
  for (let i = 0; i < langList.length; i++) {
    const len = lens[i]
    const el = langList[i]
    resMap[el] = res.slice(preI, preI + len)
    preI += len
  }
  console.log(resMap)
}
sortCon()
