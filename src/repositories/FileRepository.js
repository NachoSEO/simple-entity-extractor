export default class FileRepository {
  constructor(fs, path) {
    this.fs = fs
    this.path = path
  }

  saveToFile(filePath, data) {
    this.fs.writeFile(filePath, data, err => {
      if (err) {
        console.error(err);
      }
    });
  }
}