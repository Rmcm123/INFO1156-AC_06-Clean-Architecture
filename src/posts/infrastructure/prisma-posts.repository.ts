import { Injectable } from "@nestjs/common"
import { IPostsRepository } from "../application/ports/posts.repository.interface"
import { Post, FeedPost } from "../domain/post.entity"
import { PrismaService } from "@/shared/prisma.service"

@Injectable()
export class PrismaPostsRepository implements IPostsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: {
        title: string
        description: string
        imageUrl: string
        categoryId?: string
    }): Promise<Post> {
        const created = await this.prisma.post.create({ data })
        return new Post(
            created.id,
            created.title,
            created.description,
            created.imageUrl,
            created.categoryId,
            created.createdAt,
            created.updatedAt,
        )
    }

    async findAll(): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        })
        return posts.map(
            (p) =>
                new Post(
                    p.id,
                    p.title,
                    p.description,
                    p.imageUrl,
                    p.categoryId,
                    p.createdAt,
                    p.updatedAt,
                ),
        )
    }

    async findById(id: string): Promise<Post | null> {
        const p = await this.prisma.post.findUnique({ where: { id } })
        if (!p) return null
        return new Post(
            p.id,
            p.title,
            p.description,
            p.imageUrl,
            p.categoryId,
            p.createdAt,
            p.updatedAt,
        )
    }

    async getFeedPosts(categoryId?: string): Promise<FeedPost[]> {
        const posts = await this.prisma.post.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: { comments: true, likes: true, category: true },
        })

        return posts.map(
            (post) =>
                new FeedPost(
                    post.id,
                    post.title,
                    post.description,
                    post.imageUrl,
                    post.categoryId,
                    post.category?.name ?? null,
                    post.createdAt,
                    post.updatedAt,
                    post.likes.reduce((sum, l) => sum + l.weight, 0),
                    post.comments.length,
                    0,
                ),
        )
    }
}
