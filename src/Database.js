const fs = require('fs');

class Database {
  constructor(path) {
    this.path = path;
    this.images = {};
    this.dump = this.dump.bind(this);
    this.initFromDump = this.initFromDump.bind(this);
    this.initFromDump();
  }

  async initFromDump() {
    fs.promises
      .readFile(this.path)
      .then((file) => {
          try {
            file = JSON.parse(file);
            for (let id in file) {
              this.images[id] = file[id];
            }
          } catch (e) {
            return;
          }
        }
      )
      .catch(console.warn);
  }

  async dump() {
    fs.promises
      .writeFile(this.path, JSON.stringify(this.images))
      .catch(console.warn);
  }

  insert(image) {
    this.images[image.id] = image;
    this.dump();
  }

  get(id) {
    return this.images[id] || null;
  }

  remove(id) {
    if (!this.images[id]) {
      return false;
    }
    delete this.images[id];
    this.dump();
    return;
  }

  getList() {
    return Object.values(this.images);
  }

}

module.exports = Database;
