import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, 
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API for managing users and other resources')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Default')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
