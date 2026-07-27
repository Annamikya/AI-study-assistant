const path = require("path");
const fs = require("fs");

const getPdfPath = (pdf) => {
  if (!pdf || !pdf.filename) {
    throw new Error("PDF filename is missing");
  }

  const pdfPath = path.join(
    __dirname,
    "..",
    "uploads",
    path.basename(pdf.filename)
  );

  return pdfPath;
};

const checkPdfExists = (pdfPath) => {
  return fs.existsSync(pdfPath);
};

module.exports = {
  getPdfPath,
  checkPdfExists,
};