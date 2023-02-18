const getFileExtension = (filename) => {
  const dotIndex = filename.lastIndexOf(".");
  const extension = filename.slice(dotIndex + 1);
  return extension;
};

module.exports = { getFileExtension };