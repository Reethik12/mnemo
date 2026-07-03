import fs from "fs/promises";
import path from "path";

export interface StorageAdapter {
  upload(file: Buffer, filename: string): Promise<string>;
  delete(path: string): Promise<void>;
  read(path: string): Promise<Buffer>;
  metadata(path: string): Promise<{ size: number; mimeType: string }>;
}

export class LocalStorageAdapter implements StorageAdapter {
  private baseDir: string;

  constructor(baseDir = path.join(process.cwd(), "storage")) {
    this.baseDir = baseDir;
  }

  async init() {
    await fs.mkdir(this.baseDir, { recursive: true });
  }

  async upload(file: Buffer, filename: string): Promise<string> {
    await this.init();
    const filePath = path.join(this.baseDir, filename);
    await fs.writeFile(filePath, file);
    return filePath;
  }

  async delete(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }

  async read(filePath: string): Promise<Buffer> {
    return fs.readFile(filePath);
  }

  async metadata(
    filePath: string,
  ): Promise<{ size: number; mimeType: string }> {
    const stat = await fs.stat(filePath);
    // basic mock mime logic for local storage
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = "application/octet-stream";
    if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
    if (ext === ".png") mimeType = "image/png";
    if (ext === ".pdf") mimeType = "application/pdf";
    return { size: stat.size, mimeType };
  }
}

export const storage = new LocalStorageAdapter();
