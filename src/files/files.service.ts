import { FileElementResponse } from './dto/file-element.response';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import sharp from 'sharp';
import { CustomFile } from './CustomFile';

@Injectable()
export class FilesService {
  async saveFiles(files: CustomFile[]): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;

    await ensureDir(uploadFolder);

    const result = [];

    for (const { originalname, buffer } of files) {
      await writeFile(`${uploadFolder}/${originalname}`, buffer);

      result.push({
        url: `${dateFolder}/${originalname}`,
        name: originalname,
      });
    }

    return result;
  }

  convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
