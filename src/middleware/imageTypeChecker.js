import fs from "fs";

export const imageTypeChecker = (req, res, next) => {
  const image = req.file;
  const readFile = fs.readFileSync(image.path);
  const unit = new Uint8Array(readFile);
  let bytes = [];
  unit.forEach((byte) => {
    bytes.push(byte.toString(16));
  })
  let hex = bytes.join('').toUpperCase().substring(0, 8);
  // const readFileData = JSON.parse(readFile).data;
  console.log("🚀 ~line number file: imageTypeChecker.js ~line number line 7 ~line number imageTypeChecker ~line number readFileData", hex);
  switch (hex) {
    case 'FFD8FFE0':
    case 'FFD8FFEE':
    case 'FFD8FFE1':
      console.log("It's an jpeg image");
      next();
      break;
    case '89504E47':
      console.log("It's an png image");
      next();
      break;
    case '47494638':
      console.log("It's an gif image");
      next();
      break;
    default:
      console.error("Unsupported file found. Please upload JPEG, PNG, GIF");
      res.status(500).send({
        message: "Unsupported file found. Please upload JPEG, PNG, GIF"
      })
  }
}