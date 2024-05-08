import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
  });
  process.on("unhandledRejection", (e) => {
    console.log(e);
  });
  const config = new DocumentBuilder()
    .setTitle("Extra-ed")
    .setDescription("Extra-ed API")
    .setVersion("1.0")
    .addTag("Extra-ed")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  app.setGlobalPrefix("api");

  const configureSrvice = app.get(ConfigService);
  const port = configureSrvice.get<number>("PORT");

  await app.listen(port);
}
bootstrap();
