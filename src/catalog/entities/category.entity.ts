import {Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from 'typeorm';

@Entity('categories')
@Tree('closure-table')
export class Category{

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({length : 200})
    name : string

    @Column({nullable : true,length : 300})
    description : string

    @TreeChildren()
    children : Category[]

    @TreeParent()
    parent : Category

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

}
