import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const reactAppDir: string = join(__dirname, 'static');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: reactAppDir,
    }),
  ],
})
export class StaticModule {}
