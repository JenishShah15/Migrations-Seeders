import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength,IsOptional, MinLength, IsUUID } from "class-validator";


export class createCategoryDto{
    
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(200)
    @ApiProperty({
        default: "Category Name",
        description: "Name of the category",
        example: "jenish"
    })
    name!: string

    @IsOptional()
    @IsString()
    @MaxLength(300)
    @ApiProperty({default : "Category Descirption",description: "Description of the category",example: "This is product category description"})
    description?: string

    @IsOptional()
    @IsString()
    @MaxLength(300)
    // @IsUUID()
    @ApiProperty({default : "Category ID",description: "ID of the parent category",example: ""})
    parentId?: string

}