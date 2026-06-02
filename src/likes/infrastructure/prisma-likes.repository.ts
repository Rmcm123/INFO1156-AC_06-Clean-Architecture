import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { Like } from "@/likes/domain/like.entity"
import { ILikesRepository } from "@/likes/application/ports/likes.repository.interface"

@Injectable()
export class PrismaLikesRepository implements ILikesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: {
        postId: string
        reactionType: string
        weight: number
        source: string
    }): Promise<Like> {
        const like = await this.prisma.like.create({ data })

        return new Like(
            like.id,
            like.postId,
            like.reactionType,
            like.weight,
            like.source,
            like.createdAt,
        )
    }
}
