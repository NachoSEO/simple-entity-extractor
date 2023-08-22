export default class GetEntitiesService {
  constructor(webPageRepository, fileRepository, googleCloudRepository) {
    this.webPageRepository = webPageRepository;
    this.fileRepository = fileRepository;
    this.googleCloudRepository = googleCloudRepository;
  }

  async execute(url, selector = 'body') {
      const $ = await this.webPageRepository.request(url);
      const bodyText = this.webPageRepository.removeHtml($(`${selector}`).text());
      const entities = await this.googleCloudRepository.getEntities(bodyText);
      this.fileRepository.saveToFile('./src/output/entities.csv', this._objectToCommaSeparatedText(entities)); 

    return;
  }

  async executeInBulk() {
    const result = [];
    const data = this.fileRepository.readFile('./src/input/urls.txt');
    const urlSelectorObject = this._textToObject(data);
    for (const url in urlSelectorObject) {
      const selector = urlSelectorObject[url];
      const $ = await this.webPageRepository.request(url);
      const bodyText = this.webPageRepository.removeHtml($(`${selector}`).text());
      const entities = await this.googleCloudRepository.getEntities(bodyText);
      result.push({url, entities})
    }
    this.fileRepository.saveToFile('./src/output/entities.csv', this._arrayOfObjectsToCommaSeparatedText(result)); 
  }

  _objectToCommaSeparatedText(obj) {
    const commaSeparatedText = Object.entries(obj)
      .map(([key, value]) => `${key}, ${value}`)
      .join('\n');

    return commaSeparatedText;
  }

  _arrayOfObjectsToCommaSeparatedText(data) {
    const lines = data.flatMap((item) => {
      return Object.entries(item.entities).map(([word, number]) => `${word}, ${number}, ${item.url}`);
    });
  
    return lines.join('\n');
  }

  _textToObject(text) {
    const lines = text.split('\n');
    const result = {};
  
    lines.forEach((line) => {
      const [url, selector] = line.split(',');
      result[url] = selector || 'body';
    });
  
    return result;
  }
}
