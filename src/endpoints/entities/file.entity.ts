// file-service/src/endpoints/entities/file.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn({ name: 'file_id' })
  fileId: number;

  @Column({ length: 100 })
  category: string;

  @Column({ length: 255 })
  filename: string;

  @Column({ length: 500 })
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
