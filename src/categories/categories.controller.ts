import { Controller, Get } from "@nestjs/common"
import { GetAllCategoriesUseCase } from "@/categories/application/use-cases/get-all-categories.use-case"

@Controller("api/categories")
export class CategoriesController {
    constructor(private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase) {}

    @Get()
    async findAll() {
        return this.getAllCategoriesUseCase.execute()
    }
}
