import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TodosModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
