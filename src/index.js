import getEntitiesCommand from './providers/providers.js';

const [,,url, selector] = process.argv

getEntitiesCommand.execute(url, selector);