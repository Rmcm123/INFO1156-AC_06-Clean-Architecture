import { Inject, Injectable } from "@nestjs/common"
import {
    ICategoriesRepository,
    I_CATEGORIES_REPOSITORY,
} from "@/categories/application/ports/categories.repository.interface"
import { Category } from "@/categories/domain/category.entity"

@Injectable()
export class GetAllCategoriesUseCase {
    constructor(
        @Inject(I_CATEGORIES_REPOSITORY)
        private readonly categoriesRepository: ICategoriesRepository,
    ) {}

    async execute(): Promise<Category[]> {
        return this.categoriesRepository.findAll()
    }
}
