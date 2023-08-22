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

  _objectToCommaSeparatedText(obj) {
    const commaSeparatedText = Object.entries(obj)
      .map(([key, value]) => `${key}, ${value}`)
      .join('\n');
  
    return commaSeparatedText;
  }}
