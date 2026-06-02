import { Category } from "@/categories/domain/category.entity"

export const I_CATEGORIES_REPOSITORY = "ICategoriesRepository"

export interface ICategoriesRepository {
    findAll(): Promise<Category[]>
}
