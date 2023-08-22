export default class WebPageRepository {
  constructor(axios, cheerio) {
    this.axios = axios;
    this.cheerio = cheerio;
  }

  async request(url) {
    let config = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
      }
    };


    try {
      const response = await this.axios.get(url, config);
      const $ = this.cheerio.load(response.data);

      return $;
    } catch (err) {
      console.error(`Error requesting: ${url}\n${err}`);
    }
  }

  removeHtml(html) {
    const output = html.replace(/<[^>]*>?/g, " ");
  
    return output
  }
}