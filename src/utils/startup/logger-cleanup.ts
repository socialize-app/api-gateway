const fs = require('fs');
const folder = 'logs';
export const loggerCleanUp = async () => {
  const folderExists = fs.existsSync(folder);

  if (folderExists) {
    fs.rm(folder, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error while deleting ${folder} folder`, err);
      }
    });
  }
};
