const multer = require("multer");
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage });
// const dUri = new Datauri()

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */

const dataUri = req => parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = { upload, dataUri };
