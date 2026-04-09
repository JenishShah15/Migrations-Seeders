import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository, TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createCategoryDto } from './dto/createcategory.dto';
import { Product } from './entities/product.entity';
import {
  createproductdto,
  createproductdto as CreateProductdto,
} from './dto/createproduct.dto';
import { updateProductDto } from './dto/updateproduct.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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

  async createProdut(CreateProductDto: CreateProductdto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: CreateProductDto.category_id },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const product = this.productRepository.create({
        name: CreateProductDto.name,
        brandname: CreateProductDto.brandname,
        description: CreateProductDto.description,
        price: CreateProductDto.price,
        rating: CreateProductDto.rating,
        isActive: CreateProductDto.isActive,
        category: category,
        userId: CreateProductDto.userId,
      });

      console.log('Successfull product creation', CreateProductDto); // working
      const createdProduct = await this.productRepository.save(product);
      console.log('Successfull product creation', CreateProductDto); //not working

      return {
        message: 'Product created succesfully',
        success: true,
        statusCode: 201,
        data: createdProduct,
      };
    } catch (ex: any) {
      console.error('Error creating product', ex.message);
      throw new NotFoundException({
        message: 'Product category not found',
        success: false,
        statusCode: 404,
      });
    }
  }

  async getSingleProduct(productId) {
    const fetchedProduct = await this.productRepository
      .createQueryBuilder('Products')
      .select([
        'Products.id',
        'Products.name',
        'Products.brandname',
        'Products.description',
        'Products.price',
        'Products.rating',
        'Products.isActive',
      ])
      .where('Products.id = :id', { id: productId })
      .getOne();
    if (!fetchedProduct) {
      throw new NotFoundException('Product not found');
    }
    return {
      message: 'Product fetched succesfully',
      success: true,
      statusCode: 200,
      data: fetchedProduct,
    };
  }

  async getAllProducts() {
    try {
      const fetchedProducts = await this.productRepository
        .createQueryBuilder('Products')
        .leftJoinAndSelect('Products.category', 'categories')
        .select([
          'Products.id',
          'Products.name',
          'Products.brandname',
          'Products.description',
          'Products.price',
          'Products.rating',
          'Products.isActive',
          'categories.id',
          'categories.name',
        ])
        .getMany();

      return {
        message: 'Products fetched succesfully',
        success: true,
        statusCode: 200,
        data: fetchedProducts,
      };
    } catch (err: any) {
      throw new NotFoundException({
        success: false,
        message: 'Products not fetched',
        statusCode: 500,
        errmessage: err.message,
      });
    }
  }

  async getProductsByCategory(categoryId: string) {
    const categoryProducts = await this.productRepository
      .createQueryBuilder('products')
      .select([
        'products.id',
        'products.name',
        'products.brandname',
        'products.description',
        'products.price',
        'products.rating',
        'products.isActive',
        'products.category_id',
      ])
      .where('products.category_id = :id', { id: categoryId })
      .orderBy('products.price', 'ASC')
      .limit(1)
      .getMany();

    return {
      message: 'Products fetched succesfully',
      success: true,
      statusCode: 200,
      data: categoryProducts,
    };
  }

async updateProduct(updateproductdto: updateProductDto) {
  const product = await this.productRepository.findOneBy({
    id: updateproductdto.id,
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  // 1. Update simple fields (only if they are provided in the DTO)
  this.productRepository.merge(product, {
    name: updateproductdto.name,
    description: updateproductdto.description,
    price: updateproductdto.price,
    isActive: updateproductdto.isActive,
  });

  // 2. Handle the relationship separately
  if (updateproductdto.category_id) {
    const category = await this.categoryRepository.findOneBy({
      id: updateproductdto.category_id,
    });
    if (category) {
      product.category = category;
    }
  }

  const updatedProduct = await this.productRepository.save(product);

  return {
    message: 'Product updated successfully',
    success: true,
    statusCode: 200,
    data: updatedProduct,
  };
}

  async deleteProduct(productId: string) {
    console.log('code reached here', productId);
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      await this.productRepository.softDelete({ id: productId });
      return {
        message: 'Product deleted succesfully',
        success: true,
        statusCode: 200,
        data: product,
      };
    } catch (err: any) {
      console.error('Error deleting product', err.message);
      throw new NotFoundException({
        message: 'Product not deleted',
        success: false,
        statusCode: 500,
        errmessage: err.message,
      });
    }
  }
}
