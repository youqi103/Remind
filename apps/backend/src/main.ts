import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局管道：参数校验
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 全局过滤器：统一异常响应
  app.useGlobalFilters(new AllExceptionsFilter());

  // 全局拦截器：统一成功响应
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
