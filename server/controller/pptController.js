const File = require("../model/fileSchema");
const fs = require('fs');
const path = require("path");
const JSZip = require('jszip');


module.exports.getPpt = async (req, res, next) => {
    try {
        const student = req.query.student;
        console.log(req.query.student);
        const file = await File.findOne({ student: student });
        console.log(file);
        if (!file) {
          return res.status(404).json({ error: 'File not found' });
        }
        const filePath = path.join(__dirname, `../public/uploads/${file.name}`);
        res.download(filePath);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

//get all ppts

module.exports.getAllPpt = async (req, res, next) => {
  try {
    const files = await File.find().lean();
    
    if (!files.length) {
      return res.status(404).json({ error: 'No files found' });
    }
    console.log(files);

    const fileNames = files.map((file) => file.name);

    const zip = new JSZip();
    const folder = zip.folder('files');

    for (const fileName of fileNames) {
      console.log(fileName);
      const filePath = path.join(__dirname, `../public/uploads/${fileName}`);
      console.log(filePath);
      const fileContent = fs.readFileSync(filePath);
      console.log(fileContent);
      folder.file(fileName, fileContent);
    }
    // response will be a zip file in arraybuffer format
    const zipFile = await zip.generateAsync({ type: 'nodebuffer' });
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment; filename=files.zip');
    res.set('Content-Length', zipFile.length);
    console.log(zipFile," ghjgb ",zipFile.length);
    res.send(zipFile);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.addPpt = async (req, res, next) => {
  console.log("hiii");
  console.log(req);

}

module.exports.deletePpt = async (req, res, next) => {
   const student = req.query.student;
    console.log(student);
    //find and delete
    await File.findOneAndDelete({ student: student });
    res.json({ msg: "File deleted successfully." });
}