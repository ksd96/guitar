export default class ModelGuitars {
  constructor(data) {
    this.id = data[`id`];
    this.article = data[`article`];
    this.name = data[`name`];
    this.type = data[`type`];
    this.popularity = data[`popularity`];
    this.strings = data[`strings`];
    this.price = data[`price`];
  }

  static parseTask(data) {
    return new ModelGuitars(data);
  }

  static parseTasks(data) {
    return data.map(ModelGuitars.parseTask);
  }
}
