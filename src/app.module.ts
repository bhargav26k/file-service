import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './endpoints/entities/file.entity';
import { FileService } from './endpoints/service/file.service';
import { FileControllerGrpc } from './endpoints/controller/file.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.ctbivhonkewc.ap-south-1.rds.amazonaws.com',
      port: 3306,
      username: 'edurashiadmin',
      password: 'UAT_DEXSYS$2022',
      database: 'edurashi_file',
      entities: [FileEntity],
      synchronize: true, // only for dev
    }),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  providers: [FileService],
  controllers: [FileControllerGrpc],
})
export class AppModule {}
