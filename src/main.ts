import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'file',
        protoPath: 'src/proto/file.proto',
        url: 'localhost:50057', // pick a free port
        // ↑ below two lines increase limits to 10 MB
        maxReceiveMessageLength: 10 * 1024 * 1024,
        maxSendMessageLength:    10 * 1024 * 1024,
      },
    },
  );
  await app.listen();
  console.log('🟢 file‑service gRPC is running on localhost:50057');
}
bootstrap();
