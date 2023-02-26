export class CustomFile {
  originalname: string;
  buffer: Buffer;

  constructor(file: Express.Multer.File | CustomFile) {
    this.originalname = file.originalname;
    this.buffer = file.buffer;
  }
}
