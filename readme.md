# Simple entity extractor
Extract the entities of a given URL using the NLP system from Google Cloud

## Requirements
* NodeJS installed
* Google Cloud credentials, follow this guide: https://cloud.google.com/iam/docs/keys-create-delete

## How to use it
* Download repo
* Add dependencies `yarn` or `npm install`
* Add your Google Cloud credentials in `./src/config/gcp.json`
* Run through the command line: `node src/index.js <url> <css_selector>`
* The output with your entities will be in `./src/output/entities.csv`

If you don't add a selector the whole body will be used (some words maybe appear weird because the parsing system to delete HTML is quite simple).

### Examples: 

* `node src/index.js 'https://www.softonic.com/articulos/ahsoka-a-que-hora-se-estrena-la-nueva-serie-de-star-wars-en-disney-plus' 'article'`
```sh
{
  'Rosario Dawson': 0.20106926560401917,
  Ahsoka: 0.16541194915771484,
  Martes: 0.043081074953079224,
  serie: 0.0016539701027795672,
  fin: 0.0323215052485466,
  'Disney Plus': 0.025058437138795853,
  uno: 0.003629029495641589,
  estrenos: 0.02174600400030613,
  NoticiasAhsoka: 0.018189461901783943,
  punto: 0.017994651570916176,
  'Suscripción Anual Disney+': 0.01701190322637558,
  series: 0.0016943010268732905,
  'Star Wars': 0.011811340227723122,
  videojuegos: 0.011043447069823742,
  'aparición': 0.009717367589473724,
  personaje: 0.009717367589473724,
  'país': 0.00966811552643776,
  juego: 0.009523184038698673,
  espera: 0.0075791748240590096,
  pistas: 0.0075791748240590096,
  'The Mandalorian': 0.006372471340000629,
  ...
```

* `node src/index.js 'https://nachomascort.com/scraping-content-hijacking-the-endpoint-calls-in-the-front-end/' '.post-container'`
```sh
{
  Scraping: 0.007178295403718948,
  '\\ -H': 0.04049227386713028,
  'https://github.com/NachoSEO/google-autocomplete-extractor': 0.036833275109529495,
  payloadOnce: 0.029546057805418968,
  Google: 0.004429913125932217,
  Googlebot: 0.025536995381116867,
  way: 0.00153245753608644,
  call: 0.003964927978813648,
  example: 0.0059328884817659855,
  '\\/b\\u003e': 0.0017164398450404406,
  'Scraping content': 0.01152738370001316,
  endpoint: 0.005422821268439293,
  order: 0.002042317995801568,
  actions: 0.009126781485974789,
  site: 0.001900155795738101,
  ...
```

## Bulk mode
If instead of just extracting the entities for one URL you want to get the info of several ones you need to use the bulk mode. 

### How to use Bulk mode

* Download repo
* Add dependencies `yarn` or `npm install`
* Add your Google Cloud credentials in `./src/config/gcp.json`
* Instead of passing the URL and the selector via terminal you need to add that info in this document: `./src/input/input.txt`
* Run through the command line: `node src/bulk.js`
* The output with your entities will be in `./src/output/entities.csv`

#### Format of input
Add every URL with its selector for every line. Separate both with commas. The selector is optional, if no selector is provided it will scrape the entire body.

Example:
```sh
https://nachomascort.com/scraping-content-hijacking-the-endpoint-calls-in-the-front-end/,.post-container
https://www.softonic.com/articulos/ahsoka-a-que-hora-se-estrena-la-nueva-serie-de-star-wars-en-disney-plus,article
https://github.com/NachoSEO/simple-entity-extractor
```
