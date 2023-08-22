export default class GetEntitiesCommand {
  constructor(getEntitiesService) {
    this.getEntitiesService = getEntitiesService;
  }

  execute(url, selector) {
    return this.getEntitiesService.execute(url, selector);
  }
}
