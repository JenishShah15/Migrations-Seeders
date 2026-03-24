
import { Product } from '../../src/catalog/entities/product.entity';
import { Category } from '../../src/catalog/entities/category.entity';
import {DataSource} from 'typeorm';

export const AppDataSource = new DataSource({
    type:"postgres",
    host : "localhost",
    port : 5432,
    username : 'postgres',
    password : 'jenish_015',
    database : 'accounting_db',
    entities : [Category,Product],
    synchronize : false,
    migrations : ['src/database/migrations/*.ts'],

})