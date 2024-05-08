import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { typeOrmConfig } from "./Config/db.config";
import { BookModule } from "./book/book.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Authentication } from "./middleware/authentication";
import { UsersModule } from "./user/user.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ChapaModule } from "./chapa-sdk";
import { PaymentModule } from "./payment/payment.module";
import { AdminModule } from "./admin/admin.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
    }),
    ChapaModule.register({
      secretKey: process.env.CHAPA_SECRET_KEY,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/api/uploads",
    }),
    UsersModule,
    BookModule,
    PaymentModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authentication).exclude("users").forRoutes("products");
  }
}
