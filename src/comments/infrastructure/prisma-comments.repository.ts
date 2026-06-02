import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { Comment } from "@/comments/domain/comment.entity"
import { ICommentsRepository } from "@/comments/application/ports/comments.repository.interface"

@Injectable()
export class PrismaCommentsRepository implements ICommentsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByPostId(postId: string): Promise<Comment[]> {
        const comments = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        })

        return comments.map(
            (comment) =>
                new Comment(
                    comment.id,
                    comment.postId,
                    comment.content,
                    comment.source,
                    comment.createdAt,
                    comment.updatedAt,
                ),
        )
    }

    async create(data: {
        postId: string
        content: string
        source: string
    }): Promise<Comment> {
        const comment = await this.prisma.comment.create({ data })

        return new Comment(
            comment.id,
            comment.postId,
            comment.content,
            comment.source,
            comment.createdAt,
            comment.updatedAt,
        )
    }
}
