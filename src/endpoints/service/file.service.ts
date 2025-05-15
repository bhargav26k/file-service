// file-service/src/endpoints/service/file.service.ts

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }      from 'typeorm';
import { join }            from 'path';
import { existsSync, mkdirSync, writeFileSync, unlinkSync, readdirSync } from 'fs';
import { FileEntity }      from '../entities/file.entity';
import * as proto                from '../../proto/file';

@Injectable()
export class FileService {
  private root = process.env.UPLOAD_PATH
    || join(__dirname, '../../../../api-gateway/uploads');

  private ensureDir(cat: string) {
    const dir = join(this.root, cat);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    return dir;
  }

  async uploadFile(req: proto.UploadFileRequest): Promise<proto.UploadFileResponse> {
    const dir      = this.ensureDir(req.category);
    const name     = `${Date.now()}-${req.filename.replace(/\s+/g,'_')}`;
    const fullPath = join(dir, name);

    writeFileSync(fullPath, Buffer.from(req.data)); 
    const url = `/files/${req.category}/${name}`;

    const ent = this.repo.create({
      category: req.category,
      filename: name,
      url,
    });
    const saved = await this.repo.save(ent);

    return { fileId: saved.fileId, url };
  }

  async listByCategory(
    req: proto.CategoryRequest
  ): Promise<proto.FileListResponse> {
    const rows = await this.repo.find({ where: { category: req.category } });
    return {
      files: rows.map(r => ({
        fileId:   r.fileId,
        category: r.category,
        filename: r.filename,
        url:      r.url,
        createdAt:r.createdAt.toISOString(),
      })),
    };
  }

  async deleteFile(req: proto.DeleteFileRequest): Promise<proto.OperationStatus> {
    const ent = await this.repo.findOneBy({ fileId: req.fileId });
    if (!ent) throw new NotFoundException('File not found');

    const path = join(this.root, ent.category, ent.filename);
    if (existsSync(path)) unlinkSync(path);
    await this.repo.delete(req.fileId);

    return { success: true, message: 'Deleted' };
  }

  constructor(
    @InjectRepository(FileEntity)
    private readonly repo: Repository<FileEntity>,
  ) {}
}
