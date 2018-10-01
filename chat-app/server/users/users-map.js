module.exports = class UserMap extends Map{

  constructor(){
    super();
  }

  getAll() {
    let list = [];
    this.forEach((v, k) => {
      list.push(v);

    });
    return list;
  }
}