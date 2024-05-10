// 主要用在给翻译表格里面，输出的内容可以直接粘贴到表格里面

import path from 'path';
import fse from 'fs-extra';

const langKeys = ['zh-CN', 'zh-TW', 'en', 'vi', 'th', 'ru', 'ar', 'id', 'ms', 'es', 'ja', 'ko', 'pt', 'it', 'fr', 'tr'];

const expansion = {
  ru: '{"langStr":"ru","state":1,"translateContest":"Файловый помощник"}',
  ko: '{"langStr":"ko","state":1,"translateContest":"파일 도우미"}',
  pt: '{"langStr":"pt","state":1,"translateContest":"Assistente de arquivo"}',
  'zh-TW': '{"langStr":"zh-TW","state":1,"translateContest":"文件助手"}',
  ms: '{"langStr":"ms","state":1,"translateContest":"Pembantu fail"}',
  en: '{"langStr":"en","state":1,"translateContest":"File Assistant"}',
  it: '{"langStr":"it","state":1,"translateContest":"Assistente file"}',
  fr: '{"langStr":"fr","state":1,"translateContest":"Assistant de fichiers"}',
  'zh-CN': '{"langStr":"zh-CN","state":1,"translateContest":"文件小助手"}',
  oriTextLanguage: 'zh-CN',
  es: '{"langStr":"es","state":1,"translateContest":"asistente de archivos"}',
  ar: '{"langStr":"ar","state":1,"translateContest":"مساعد الملفات"}',
  vi: '{"langStr":"vi","state":1,"translateContest":"Trợ lý tập tin"}',
  th: '{"langStr":"th","state":1,"translateContest":"ผู้ช่วยไฟล์"}',
  ja: '{"langStr":"ja","state":1,"translateContest":"ファイルアシスタント"}',
  id: '{"langStr":"id","state":1,"translateContest":"Asisten berkas"}',
  tr: '{"langStr":"tr","state":1,"translateContest":"Dosya asistanı"}'
};

const createText = (key, langs) => {
  const list = langs.map((key) => {
    const value = expansion[key];
    if (!value) return '';
    const obj = JSON.parse(value);
    return obj.translateContest;
  });
  list.unshift(key);

  const str = list.join('\t');
  fse.outputFileSync(path.join(__dirname, './output/out.txt'), str, 'utf-8');
};
createText('fxchat_common_file_assistant', langKeys);
