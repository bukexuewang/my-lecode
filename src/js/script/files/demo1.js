import path from 'path';
import fse from 'fs-extra';

const jsFolder = path.join(__dirname, './js');
const cnFile = path.join(__dirname, './cn.json');
const outPutPath = path.join(__dirname, './output.json');

const fn = () => {
  const files = fse.readdirSync(jsFolder);
  let jsText = '';
  files.forEach((filePath) => {
    if (filePath.slice(-2) !== 'js') return;
    const fileText = fse.readFileSync(path.join(jsFolder, filePath), 'utf-8');
    jsText += fileText;
  });

  const cnFileText = fse.readFileSync(cnFile, 'utf-8');
  const cnObj = new Function('return ' + cnFileText)();
  const res = Object.keys(cnObj).reduce((result, key) => {
    if (jsText.includes(key)) {
      result[key] = cnObj[key];
    }
    return result;
  }, {});
  // const sortObj = Object.keys(obj)
  //   .sort()
  //   .reduce((result, key) => {
  //     result[key] = obj[key];
  //     return result;
  //   }, {});
  fse.outputJsonSync(outPutPath, res, { spaces: 2 });
};

fn();
