import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { Category } from "@/categories/domain/category.entity"
import { ICategoriesRepository } from "@/categories/application/ports/categories.repository.interface"

@Injectable()
export class PrismaCategoriesRepository implements ICategoriesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Category[]> {
        const categories = await this.prisma.category.findMany({
            orderBy: { name: "asc" },
        })

        return categories.map(
            (category) =>
                new Category(
                    category.id,
                    category.name,
                    category.slug,
                    category.createdAt,
                    category.updatedAt,
                ),
        )
    }
}
