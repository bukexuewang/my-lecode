// 借用国际聊天室的翻译功能，处理单个文案的翻译
import fs from 'fs-extra';
import path from 'path';

const langs =
  '简体(zh-CN),繁体(zh-TW),英文(en),越南语,泰语1,俄语,阿语,印尼语,马来语,西班牙语,日语,韩语,葡语,意大利语,法语,土耳其语'.split(
    ','
  );
const arr = [
  '移除成功,移除成功,Removed successfully,Cho phép thành công,ลบสำเร็จแล้ว,Звук успешно включен,تم إلغاء كتم الصوت بنجاح,Berhasil dihapus,Berjaya dikeluarkan,Silencio desactivado exitosamente,ミュートが正常に解除されました,음소거가 성공적으로 해제되었습니다.,Ativado com sucesso,Riattivato con successo,Réactivation du son avec succès,Yoksayma başarıyla açıldı'
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
  '移除成功[ss]移除成功[ss]Removed successfully[ss]Cho phép thành công[ss]ลบสำเร็จแล้ว[ss]Звук успешно включен[ss]تم إلغاء كتم الصوت بنجاح[ss]Berhasil dihapus[ss]Berjaya dikeluarkan[ss]Silencio desactivado exitosamente[ss]ミュートが正常に解除されました[ss]음소거가 성공적으로 해제되었습니다.[ss]Ativado com sucesso[ss]Riattivato con successo[ss]Réactivation du son avec succès[ss]Yoksayma başarıyla açıldı';

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

const str3 = `移除成功	移除成功	Removed successfully	Cho phép thành công	ลบสำเร็จแล้ว	Звук успешно включен	تم إلغاء كتم الصوت بنجاح	Berhasil dihapus	Berjaya dikeluarkan	Silencio desactivado exitosamente	ミュートが正常に解除されました	음소거가 성공적으로 해제되었습니다.	Ativado com sucesso	Riattivato con successo	Réactivation du son avec succès	Yoksayma başarıyla açıldı									`;

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
