import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreferenceModule } from './preference/preference.module';
import { ChatModule } from './chat/chat.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [PreferenceModule, ChatModule, ExperienceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
