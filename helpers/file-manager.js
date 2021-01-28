const fs = require('fs');
const fse = require('fs-extra');

exports.write = async (path, file) => {
  const fileName = `${Date.now()}__${file.originalname.replace(/ /g, '')}`;
  const folderFullPath = `${process.cwd()}/${path}`;
  const fullPath = `${folderFullPath}/${fileName}`;
  await fse.outputFile(fullPath, file.buffer);
  return `${path}/${fileName}`;
};

exports.remove = async (path) => {
  try {
    const fileLink = `${process.cwd()}/${path}`;
    if (fs.existsSync(fileLink) && fs.lstatSync(fileLink).isFile()) {
      return fse.remove(fileLink);
    }
  } catch (e) {
    console.error(e);
  }
};

exports.isExist = async (path) => fse.pathExists(path);
