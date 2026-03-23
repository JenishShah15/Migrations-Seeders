import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createCategoryDto } from './dto/createcategory.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
  ) {}

  // ✅ Create Category (Root or Child)
  async createCategory(createcategorydto: createCategoryDto) {
    let parent: any = null; 

    // 🔥 Correct condition
    if (createcategorydto.parentId) {
      parent = await this.categoryRepository.findOne({
        where: { id: createcategorydto.parentId },
      });

      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
    }

    const category = this.categoryRepository.create({
      name: createcategorydto.name,
      description: createcategorydto.description,
      parent: parent,
    });

    return await this.categoryRepository.save(category);
  }

  // ✅ Get Full Category Tree
  async getCategoryTree() {
    return await this.categoryRepository.findTrees();
  }

  // ✅ Get Subtree (Descendants)
  async getSubTree(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.findDescendantsTree(category);
  }

  // ✅ Get Ancestors Tree (Parent Chain)
  async getAncestor(categoryId: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parent'], // 🔥 important fix
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.findAncestorsTree(category);
  }
}