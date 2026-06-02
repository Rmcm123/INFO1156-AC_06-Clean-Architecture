import {
    BadRequestException,
    Injectable,
    NotFoundException,
    Inject,
} from "@nestjs/common"
import { CreateCommentDto } from "@/posts/posts.dtos"
import { ModerationService } from "@/moderation/moderation.service"
import { IPostsRepository, I_POSTS_REPOSITORY } from "@/posts/application/ports/posts.repository.interface"
import { PrismaService } from "@/shared/prisma.service"

@Injectable()
export class CommentsService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(I_POSTS_REPOSITORY)
        private readonly postsRepository: IPostsRepository,
        private readonly moderationService: ModerationService,
    ) {}

    async listByPostId(postId: string) {
        await this.assertPostExists(postId)

        const comments = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        })

        return {
            total_comments: comments.length,
            comments,
        }
    }

    async create(postId: string, data: CreateCommentDto) {
        await this.assertPostExists(postId)

        const moderation = await this.moderationService.moderate(data.content)
        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Comentario bloqueado por moderación",
            )
        }

        return this.prisma.comment.create({
            data: {
                postId,
                content: data.content,
                source: "comments-module",
            },
        })
    }

    private async assertPostExists(postId: string) {
        const post = await this.postsRepository.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }
    }
}
