import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Buffer } from 'buffer';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true, length: 200 })
  userId?: string;

  @Column({ nullable: false, length: 200 })
  name?: string;

  @Column({ nullable: false, length: 200 })
  brandname?: string;

  @Column('text', { nullable: false })
  description?: string;

  @Column('decimal', { nullable: false })
  price?: number;

  @Column('decimal',{ default: 0 })
  rating?: number;

  @Column({ default: true })
  isActive?: boolean;

  @ManyToOne(() => Category, (category) => category.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

 @Column({type : 'bytea',nullable : true})
  imageUrl?: Buffer;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
