import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { createCategoryDto } from './dto/createcategory.dto';
import { createproductdto } from './dto/createproduct.dto';
import { ApiQuery } from '@nestjs/swagger';
import { updateProductDto } from './dto/updateproduct.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  // ✅ Create Category (Root or Child)
  @Post('category')
  async createCategory(@Body() createcategorydto: createCategoryDto) {
    return await this.catalogService.createCategory(createcategorydto);
  }

  // ✅ Get Full Tree
  @Get('category')
  async getCategoryTree() {
    return await this.catalogService.getCategoryTree();
  }

  // ✅ Get Subtree (Descendants)
  @Get('category/subtree/:id')
  async getSubTree(@Param('id') id: string) {
    return await this.catalogService.getSubTree(id);
  }

  // ✅ Get Ancestors Tree (Parent Chain)
  @Get('category/ancestors/:id')
  async getParentTree(@Param('id') id: string) {
    return await this.catalogService.getAncestor(id);
  }

  // Product Controllers

  @Post('product')
  async createProduct(@Body() Createproductdto: createproductdto) {
    return await this.catalogService.createProdut(Createproductdto);
  }

  @Get('product/all')
  async getAllProducts() {
    return await this.catalogService.getAllProducts();
  }

  @ApiQuery({
    name: 'productid',
    example: '7b5b27a6-569e-41cb-a71c-ecc738e57a7d',
  })
  @Get('product/:productid')
  async getSingleProduct(@Param('productid') productId: string) {
    return await this.catalogService.getSingleProduct(productId);
  }

  @Patch('product/update')
  async updateProduct(@Body() updateproductdto : updateProductDto)
  {
    return await this.catalogService.updateProduct(updateproductdto);
  }

  @ApiQuery({
    name: 'categoryId',
    example: 'a0e65453-2ec0-4958-b5e9-89182242b81f',
  })
  @Get('product/category/')
  async getCategoryProduct(@Query('categoryId') categoryId: string) {
    return await this.catalogService.getProductsByCategory(categoryId);
  }
  @ApiQuery({
    name: 'productid',
    example: '7b5b27a6-569e-41cb-a71c-ecc738e57a7d',
  })
  @Delete('product/delete/:productId')
  async deleteProduct(@Param('productId') productId: string) {
    return await this.catalogService.deleteProduct(productId);
  }
}
