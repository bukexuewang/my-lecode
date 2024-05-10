// 借用国际聊天室的翻译功能，处理单个文案的翻译

import fse from 'fs-extra';
import path from 'path';

('Key	简体(zh-CN)	繁体(zh-TW)	英文(en)	越南语	泰语1	俄语	阿语	印尼语	马来语	西班牙语	日语	韩语	葡语	意大利语	法语	土耳其语									');
('Key,简体(zh-CN),繁体(zh-TW),英文(en),越南语,泰语1,俄语,阿语,印尼语,马来语,西班牙语,日语,韩语,葡语,意大利语,法语,土耳其语');
const langKeys = ['zh-CN', 'zh-TW', 'en', 'vi', 'th', 'ru', 'ar', 'id', 'ms', 'es', 'ja', 'ko', 'pt', 'it', 'fr', 'tr'];

const langKeys2 = [
  'zh-CN',
  'zh-TW',
  'en',
  'vi',
  'th',
  'ar',
  'ms',
  'id',
  'es',
  'ja',
  'ko',
  'pt',
  'it',
  'fr',
  'tr',
  'ru'
];

const expansion = {
  ru: '{"langStr":"ru","state":1,"translateContest":"Удален успешно"}',
  ko: '{"langStr":"ko","state":1,"translateContest":"성공적으로 제거되었습니다"}',
  pt: '{"langStr":"pt","state":1,"translateContest":"Removido com sucesso"}',
  'zh-TW': '{"langStr":"zh-TW","state":1,"translateContest":"移除成功"}',
  ms: '{"langStr":"ms","state":1,"translateContest":"Berjaya dialih keluar"}',
  en: '{"langStr":"en","state":1,"translateContest":"Removed successfully"}',
  it: '{"langStr":"it","state":1,"translateContest":"Rimosso con successo"}',
  fr: '{"langStr":"fr","state":1,"translateContest":"Supprimé avec succès"}',
  'zh-CN': '{"langStr":"zh-CN","state":1,"translateContest":"移除成功"}',
  oriTextLanguage: 'zh-CN',
  es: '{"langStr":"es","state":1,"translateContest":"Eliminado con éxito"}',
  ar: '{"langStr":"ar","state":1,"translateContest":"تمت الإزالة بنجاح"}',
  vi: '{"langStr":"vi","state":1,"translateContest":"Đã xóa thành công"}',
  th: '{"langStr":"th","state":1,"translateContest":"ลบสำเร็จแล้ว"}',
  ja: '{"langStr":"ja","state":1,"translateContest":"正常に削除されました"}',
  id: '{"langStr":"id","state":1,"translateContest":"Berhasil dihapus"}',
  tr: '{"langStr":"tr","state":1,"translateContest":"Başarıyla kaldırıldı"}'
};

const createText = (langs) => {
  const str = langs
    .map((key) => {
      const value = expansion[key];
      if (!value) return '';
      const obj = JSON.parse(value);
      return obj.translateContest;
    })
    .join('\t');
  fse.outputFileSync(path.join(__dirname, './output/out.txt'), str, 'utf-8');
};
createText(langKeys2);

const expansion2 = {
  ru: '{"langStr":"ru","state":1,"translateContest":"Удален успешно"}',
  ko: '{"langStr":"ko","state":1,"translateContest":"성공적으로 제거되었습니다"}',
  pt: '{"langStr":"pt","state":1,"translateContest":"Removido com sucesso"}',
  tw: '{"langStr":"zh-TW","state":1,"translateContest":"移除成功"}',
  ms: '{"langStr":"ms","state":1,"translateContest":"Berjaya dialih keluar"}',
  en: '{"langStr":"en","state":1,"translateContest":"Removed successfully"}',
  it: '{"langStr":"it","state":1,"translateContest":"Rimosso con successo"}',
  fr: '{"langStr":"fr","state":1,"translateContest":"Supprimé avec succès"}',
  cn: '{"langStr":"zh-CN","state":1,"translateContest":"移除成功"}',
  es: '{"langStr":"es","state":1,"translateContest":"Eliminado con éxito"}',
  ar: '{"langStr":"ar","state":1,"translateContest":"تمت الإزالة بنجاح"}',
  vi: '{"langStr":"vi","state":1,"translateContest":"Đã xóa thành công"}',
  th: '{"langStr":"th","state":1,"translateContest":"ลบสำเร็จแล้ว"}',
  jp: '{"langStr":"ja","state":1,"translateContest":"正常に削除されました"}',
  id: '{"langStr":"id","state":1,"translateContest":"Berhasil dihapus"}',
  tr: '{"langStr":"tr","state":1,"translateContest":"Başarıyla kaldırıldı"}'
};
// 牛人榜的翻译文件快速添加某个key值
const addKeyLang = () => {
  const langFolder = path.join(__dirname, './langJs');
  const files = fse.readdirSync(langFolder);
  files.forEach((file) => {
    const filePath = path.join(langFolder, file);
    const fileCon = fse.readFileSync(filePath, 'utf-8');
    const fileObj = new Function(`return ${fileCon.replace('export default', '')}`)();
    const lang = file.match(/[a-z]+/)[0];
    if (!lang || !fileObj) return;
    const langObj = JSON.parse(expansion2[lang] || '');
    if (!langObj) return;
    fileObj.setting.removeSuccess = langObj.translateContest;
    fse.writeFileSync(
      path.join(__dirname, `./langList/${lang}.js`),
      `export default ${JSON.stringify(fileObj, null, 2)}`
    );
  });
};
// addKeyLang();
