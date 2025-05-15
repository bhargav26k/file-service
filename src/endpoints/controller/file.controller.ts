// file-service/src/endpoints/controller/file.controller.ts

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FileService } from '../service/file.service';
import * as proto from '../../proto/file';

@Controller()
export class FileControllerGrpc {
  constructor(private readonly svc: FileService) {}

  @GrpcMethod('FileService', 'UploadFile')
  UploadFile(req: proto.UploadFileRequest): Promise<proto.UploadFileResponse> {
    return this.svc.uploadFile(req);
  }

  @GrpcMethod('FileService', 'ListFilesByCategory')
  ListFilesByCategory(req: proto.CategoryRequest): Promise<proto.FileListResponse> {
    return this.svc.listByCategory(req);
  }

  @GrpcMethod('FileService', 'DeleteFile')
  DeleteFile(req: proto.DeleteFileRequest): Promise<proto.OperationStatus> {
    return this.svc.deleteFile(req);
  }
}
