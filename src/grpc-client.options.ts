import { ClientOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'file',
    protoPath: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? '../dist/proto/file.proto' : '../src/proto/file.proto'), // Ensure correct path
    url: 'localhost:50057',
  },
};
