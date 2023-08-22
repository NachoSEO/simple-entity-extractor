export default class GoogleCloudRepository {
  constructor(language, credentials) {
    this.language = language;
    this.credentials = credentials;
  }

  async getEntities(text) {
    const client = new this.language.LanguageServiceClient({ credentials: this.credentials });

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    try {
        const [result] = await client.analyzeEntities({ document });
        const entities = result.entities;
        const entitiesObj = {};
        entities.forEach( entity => {
            if(entity.salience != 0) {
                entitiesObj[entity.name] =  entity.salience;
            }
        });
        return entitiesObj;
    } catch (err) {
        console.error('ERROR! Entities: ' + err);
        return {};
    }  
};
}