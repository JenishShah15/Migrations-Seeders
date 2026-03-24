import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Category,Product])],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
