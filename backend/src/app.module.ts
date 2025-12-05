import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PollModule } from './poll/poll.module';


@Module({
  imports: [PrismaModule, PollModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
