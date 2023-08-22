import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import language from '@google-cloud/language';

import credentials from '../config/gcp.json' assert { type: 'json' };

import FileRepository from '../repositories/FileRepository.js';
import WebPageRepository from "../repositories/WebPageRepository.js";
import GoogleCloudRepository from '../repositories/GoogleCloudRepository.js'

import GetEntitiesService from "../services/GetEntitiesService.js";

import GetEntitiesCommand from "../commands/GetEntitiesCommand.js";


export default new GetEntitiesCommand(
  new GetEntitiesService(
    new WebPageRepository(
      axios,
      cheerio
    ),
    new FileRepository(
      fs,
      path
    ),
    new GoogleCloudRepository(
      language,
      credentials
    )
  )
);