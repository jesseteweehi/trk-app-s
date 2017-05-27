import { Injectable } from '@angular/core';

import { Examples } from "../models/data"

@Injectable()
export class LearningExperienceService {

  examples: Object;

  constructor() {
  	this.examples = Examples;
  }

}
