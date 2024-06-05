const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

const uploadPath = path.join(__dirname, 'src/assets/img/');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath); // Verwenden Sie die zuvor berechnete Variable
    },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Behalten Sie den Originalnamen der Datei bei
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.send('Datei erfolgreich hochgeladen');
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
  console.log(`Resolved upload path: ${uploadPath}`);
});