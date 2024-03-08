import fs from 'fs';
import path from 'path';

const langs =
  '简体(zh-CN),繁体(zh-TW),英文(en),越南语,泰语1,俄语,阿语,印尼语,马来语,西班牙语,日语,韩语,葡语,意大利语,法语,土耳其语'.split(
    ','
  );
const arr = [
  '全部,全部,All,Tất cả,ทั้งหมด,Все,الجميع,Semua,Semua,Todo,全て,모두,Todos,Tutto,Tous,Tüm',
  '聊天室,聊天室,Chatroom,Phòng Chat,ห้องสนทนา,чат,غرفة الدردشة,ruang obrolan,Bilik Sembang,Sala de chat,チャットルーム,대화방,Sala de bate-papo,Chat,Tchat,Sohbet odası',
  '群聊,群聊,Groups,Nhóm,กลุ่ม,Группы,مجموعات,Grup,Kumpulan,Grupos,グループ,여러 떼,Grupos,Gruppi,Groupes,Gruplar',
  '好友,好友,Friends,Bạn,เพื่อน,Друзья,أصدقاء,Teman-teman,Kenalan,Amigos,友達,친구,Amigos,Amici,Amis,Arkadaşlar'
].map((item) => item.split(','));

const wTxt = () => {
  let obj = {};
  langs.forEach((lang, i) => {
    const list = [];
    arr.forEach((item) => list.push(item[i]));
    obj[lang] = list;
  });
  fs.writeFileSync('./langList.json', JSON.stringify(obj, null, 2));
};

// wTxt();
const keys =
  '简体(zh-CN)[ss]繁体(zh-TW)[ss]英文(en)[ss]越南语[ss]泰语1[ss]俄语[ss]阿语[ss]印尼语[ss]马来语[ss]西班牙语[ss]日语[ss]韩语[ss]葡语[ss]意大利语[ss]法语[ss]土耳其语';
const targetKeys =
  '简体[ss]繁体[ss]英语[ss]越南语[ss]泰语[ss]阿拉伯语[ss]马来语[ss]印尼语[ss]西班牙语[ss]日语[ss]韩语[ss]葡语[ss]意大利语[ss]法语[ss]土耳其语[ss]俄语';
const langTxt =
  '请输入...[ss]請輸入...[ss]Type here...[ss]Nhập nội dung...[ss]พิมพ์ที่นี่...[ss]Введите здесь...[ss]أكتب هنا...[ss]Ketik di sini...[ss]Taip di sini...[ss]Escriba aquí...[ss]ここに入力...[ss]여기에 입력하세요...[ss]Digite aqui...[ss]Digitare qui...[ss]Écrivez ici...[ss]Buraya yaz...';

const parseTxt = (v) => v.split('[ss]');
const sortCon = () => {
  const keyList = parseTxt(keys);
  const conList = parseTxt(langTxt);
  const list = parseTxt(targetKeys).map((key) => {
    const idx = keyList.findIndex((item) => item[0] === key[0]);
    return conList[idx];
  });
  const str = list.join('\t');

  fs.writeFileSync(path.join(__dirname, './output.txt'), str);
};
// sortCon();

// console.log(sortCon.toString());

function testFn(val) {
  let v = 1;
  v++;
  return v;
}

// const classfn = new Function('val', 'let v = 1; v++; return v;');

// console.log(classfn.toString());

const str3 = `请输入...	請輸入...	Type here...	Nhập nội dung...	พิมพ์ที่นี่...	أكتب هنا...	Taip di sini...	Ketik di sini...	Escriba aquí...	ここに入力...	여기에 입력하세요...	Digite aqui...	Digitare qui...	Écrivez ici...	Buraya yaz...	Введите здесь...
正在连接聊天室	正在連接聊天室	Connecting to chat room	Đang kết nối với phòng trò chuyện	กำลังเชื่อมต่อกับห้องสนทนา	  الاتصال بغرفة الدردشة	Menyambung ke bilik sembang	Menghubungkan ke ruang obrolan	Conexión a la sala de chat	チャットルームに接続中	채팅방에 연결 중	Conectando-se à sala de bate-papo	Connessione alla chat room	Connexion à la salle de discussion	Sohbet odasına bağlanılıyor	Подключение к чату`;

const list = str3.split('\n').map((item) => item.split('\t'));
const sortArr3 = [0, 2, 1, 5, 9, 11, 12, 8, 10, 13, 3, 4, 7, 6, 15, 14];
const wFn3 = () => {
  let str = '';
  list.forEach((item) => {
    sortArr3.forEach((idx) => {
      str += `${item[idx]}\t`;
    });
    str += '\n';
  });
  fs.writeFileSync(path.join(__dirname, './output.txt'), str);
};
wFn3();
