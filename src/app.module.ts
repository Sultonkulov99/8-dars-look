import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FoodsModule } from './modules/foods/foods.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config : ConfigService) => ({
        dialect: config.get("DB_DIALECT"),
        host:config.get("DB_HOST"),
        port:config.get("DB_PORT"),
        database:config.get("DB_DATABASE"),
        username:config.get("DB_USERNAME"),
        password:config.get("DB_PASSWORD"),
        models:[],
        autoLoadModels:true,
        synchronize:true,
        logging:true,
        dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    }})}),
// SequelizeModule.forRoot({
//   dialect: 'postgres',
//   host: 'ep-dry-bird-ahdm9pqf-pooler.c-3.us-east-1.aws.neon.tech',
//   port: 5432,
//   username: 'neondb_owner',
//   password: 'npg_xF2b6MAzYOik',
//   database: 'neondb',
//   autoLoadModels: true,
//   synchronize: true,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// }),
    UsersModule,
    FoodsModule, 
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
