const express = require('express');
const router = express.Router();
const fs = require('fs');

const pathRouter = `${__dirname}`;

const removeExtension = ( fileName ) => {
  return fileName.split('.').shift();
}

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExtension = removeExtension(file);
  const skip = ['index'].includes(fileWithOutExtension);

  if(!skip) {
    router.use(`/${fileWithOutExtension}`,require(`./${fileWithOutExtension}`));
    console.log('----------> CARGAR RUTA ', fileWithOutExtension);
  }

})

router.get('*', (req,res) => {
  res.status(404);
  res.send({ error: 'Not Found' });
})

module.exports = router;
