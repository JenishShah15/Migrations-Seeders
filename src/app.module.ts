import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './catalog/entities/category.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'jenish_015',
      database: 'accounting_db',

      autoLoadEntities: true, // 🔥 IMPORTANT
      synchronize: false,
    }),CatalogModule],

})
export class AppModule {}
