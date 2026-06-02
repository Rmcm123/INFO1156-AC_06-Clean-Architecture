import { Module } from "@nestjs/common"
import { CategoriesController } from "@/categories/categories.controller"
import { GetAllCategoriesUseCase } from "@/categories/application/use-cases/get-all-categories.use-case"
import { PrismaCategoriesRepository } from "@/categories/infrastructure/prisma-categories.repository"
import {
    I_CATEGORIES_REPOSITORY,
} from "@/categories/application/ports/categories.repository.interface"
import { PrismaModule } from "@/shared/prisma.module"

@Module({
    imports: [PrismaModule],
    controllers: [CategoriesController],
    providers: [
        GetAllCategoriesUseCase,
        {
            provide: I_CATEGORIES_REPOSITORY,
            useClass: PrismaCategoriesRepository,
        },
    ],
})
export class CategoriesModule {}
