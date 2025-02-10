import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { FileStatistics } from 'types/src/statistics.model';

@Injectable()
export class OutputService {
  private readonly logger = new Logger(OutputService.name);
  private readonly directory = 'userdata';
  private readonly rootFileName = 'everyone.txt';
  private readonly DELIMITER = '; ';

  public saveStatistics(statistics: FileStatistics) {
    const content = this.createContent(statistics);

    // write into root file
    const rootFilePath = path.join(this.directory, this.rootFileName);
    this.logger.debug(
      `Saving statistics for ${statistics.experimenteeId} in ${rootFilePath}`,
    );
    this.appendFileInNewLine(rootFilePath, content);

    // write into user directory
    const userFilePath = path.join(
      this.directory,
      this.sanitizeUserId(statistics.experimenteeId),
      this.sanitizeUserId(statistics.experimenteeId) + '.txt',
    );
    this.logger.debug(
      `Saving statistics for ${statistics.experimenteeId} in ${userFilePath}`,
    );
    this.appendFileInNewLine(userFilePath, content);

    // write into individual user file
    const individualFilePath = path.join(
      this.directory,
      this.sanitizeUserId(statistics.experimenteeId),
      this.getFileNameFromUserId(statistics.experimenteeId),
    );
    this.logger.debug(
      `Saving statistics for ${statistics.experimenteeId} in ${individualFilePath}`,
    );
    this.appendFileInNewLine(individualFilePath, content);

    this.logger.log(`Saved statistics for ${statistics.experimenteeId}`);
  }

  getAllDataAsLines(): string[] {
    const rootFilePath = path.join(this.directory, this.rootFileName);
    if (!fs.existsSync(rootFilePath)) {
      return [];
    }
    const content = fs.readFileSync(rootFilePath, 'utf8');
    const lines = content.split('\n');
    lines.shift(); // remove headline
    return lines;
  }

  private appendFileInNewLine(filePath: string, content: string) {
    this.createFileIfNotExists(filePath);
    fs.appendFileSync(filePath, '\n' + content);
  }

  private createFileIfNotExists(filePath: string) {
    if (!fs.existsSync(filePath)) {
      const directory = path.dirname(filePath);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      fs.writeFileSync(filePath, this.buildHeadline());
    }
  }

  private buildHeadline() {
    return (
      'participant ID' +
      this.DELIMITER +
      'date' +
      this.DELIMITER +
      'amountOfPlayedBlocks' +
      this.DELIMITER +
      'mean n' +
      this.DELIMITER +
      'heighest n' +
      this.DELIMITER +
      'correct_overall_percent' +
      this.DELIMITER +
      'correct_visuals_percent' +
      this.DELIMITER +
      'correct_auditory_percent' +
      this.DELIMITER +
      'correct_visualauditory_percent' +
      this.DELIMITER +
      'correct_nopress_percent' +
      this.DELIMITER +
      'false_overall_percent' +
      this.DELIMITER +
      'false_visuals_percent' +
      this.DELIMITER +
      'false_auditory_percent' +
      this.DELIMITER +
      'false_visualauditory_percent' +
      this.DELIMITER +
      'false_nopress_percent'
    );
  }

  private sanitizeUserId(userId: string) {
    return userId
      .trim()
      .substring(0, 25)
      .replace(/[^a-z0-9]/gi, '_');
  }

  private getFileNameFromUserId(userid: string) {
    return this.sanitizeUserId(userid) + '_' + this.getTimeStamp() + '.txt';
  }

  public getTimeStamp(): string {
    return new Date()
      .toISOString() // Format as "YYYY-MM-DDTHH:mm:ss.sssZ"
      .replace(/T/, '_') // Replace 'T' with '_'
      .replace(/:/g, '-') // Replace ':' with '-'
      .split('.')[0]; // Remove milliseconds
  }

  private createContent(statistics: FileStatistics): string {
    return (
      statistics.experimenteeId +
      this.DELIMITER +
      statistics.date +
      this.DELIMITER +
      statistics.amountOfPlayedBlocks +
      this.DELIMITER +
      statistics.meanN +
      this.DELIMITER +
      statistics.highestN +
      this.DELIMITER +
      statistics.correctOverallPercent +
      this.DELIMITER +
      statistics.correctVisualsPercent +
      this.DELIMITER +
      statistics.correctAuditoryPercent +
      this.DELIMITER +
      statistics.correctVisualAuditoryPercent +
      this.DELIMITER +
      statistics.correctNoPressPercent +
      this.DELIMITER +
      statistics.falseOverallPercent +
      this.DELIMITER +
      statistics.falseVisualsPercent +
      this.DELIMITER +
      statistics.falseAuditoryPercent +
      this.DELIMITER +
      statistics.falseVisualAuditoryPercent +
      this.DELIMITER +
      statistics.falseNoPressPercent
    );
  }
}
