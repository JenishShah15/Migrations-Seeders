import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { createCategoryDto } from './dto/createcategory.dto';

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
}