import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class OutputService {
  private readonly directory = 'userdata';

  constructor() {
    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory, { recursive: true });
    }
  }

  public saveFile(fileName: string, content: string) {
    const filePath = path.join(this.directory, fileName);
    fs.writeFileSync(filePath, content);
  }
}
