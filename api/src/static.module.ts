import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const reactAppDir: string = join(__dirname, 'static');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: reactAppDir,
      serveStaticOptions: {
        maxAge: 7200000,
      },
    }),
  ],
})
export class StaticModule {}
