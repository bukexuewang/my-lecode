// 从该文件上找到i18n文件夹，找到所有的翻译文件，然后再次文件基础上增加key值
import path from 'path';
import fse from 'fs-extra';

const expansion = {
  ru: '{"langStr":"ru","state":1,"translateContest":"Функция"}',
  ko: '{"langStr":"ko","state":1,"translateContest":"기능"}',
  pt: '{"langStr":"pt","state":1,"translateContest":"Função"}',
  'zh-TW': '{"langStr":"zh-TW","state":1,"translateContest":"功能"}',
  ms: '{"langStr":"ms","state":1,"translateContest":"Fungsi"}',
  en: '{"langStr":"en","state":1,"translateContest":"Function"}',
  it: '{"langStr":"it","state":1,"translateContest":"Funzione"}',
  fr: '{"langStr":"fr","state":1,"translateContest":"Fonction"}',
  'zh-CN': '{"langStr":"zh-CN","state":1,"translateContest":"功能"}',
  oriTextLanguage: 'zh-CN',
  es: '{"langStr":"es","state":1,"translateContest":"Función"}',
  ar: '{"langStr":"ar","state":1,"translateContest":"وظيفة"}',
  vi: '{"langStr":"vi","state":1,"translateContest":"Chức năng"}',
  th: '{"langStr":"th","state":1,"translateContest":"การทำงาน"}',
  ja: '{"langStr":"ja","state":1,"translateContest":"関数"}',
  id: '{"langStr":"id","state":1,"translateContest":"Fungsi"}',
  tr: '{"langStr":"tr","state":1,"translateContest":"İşlev"}'
};

const sourceDir = path.join(__dirname, './lang');

const readLangs = () => {
  const files = fse.readdirSync(sourceDir);
  const langs = files.map((file) => {
    const lang = file.replace('.json', '');
    return lang;
  });
  return langs;
};

console.log(readLangs());
