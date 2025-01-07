import { Inject, Injectable } from '@nestjs/common';
import { OutputService } from '../output/output.service';

@Injectable()
export class UseridService {
  @Inject() outputService: OutputService;

  public saveUserid(userId: string) {
    const filename = this.getFileNameFromUserId(userId);
    const content = `Userid: ${userId}`;
    this.outputService.saveFile(filename, content);
    return filename;
  }

  getFileNameFromUserId(userid: string) {
    const timestamp = new Date()
      .toISOString() // Format as "YYYY-MM-DDTHH:mm:ss.sssZ"
      .replace(/T/, '_') // Replace 'T' with '_'
      .replace(/:/g, '-') // Replace ':' with '-'
      .split('.')[0]; // Remove milliseconds
    return (
      userid
        .trim()
        .substring(0, 25)
        .replace(/[^a-z0-9]/gi, '_') +
      '__' +
      timestamp +
      '.txt'
    );
  }
}
