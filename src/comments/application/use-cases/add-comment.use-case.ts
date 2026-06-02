import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import {
    IPostsRepository,
    I_POSTS_REPOSITORY,
} from "@/posts/application/ports/posts.repository.interface"
import { Comment } from "@/comments/domain/comment.entity"
import {
    ICommentsRepository,
    I_COMMENTS_REPOSITORY,
} from "@/comments/application/ports/comments.repository.interface"
import {
    ICommentModerationPort,
    I_COMMENT_MODERATION_PORT,
} from "@/comments/application/ports/comment-moderation.port.interface"

@Injectable()
export class AddCommentUseCase {
    constructor(
        @Inject(I_COMMENTS_REPOSITORY)
        private readonly commentsRepository: ICommentsRepository,
        @Inject(I_POSTS_REPOSITORY)
        private readonly postsRepository: IPostsRepository,
        @Inject(I_COMMENT_MODERATION_PORT)
        private readonly moderationPort: ICommentModerationPort,
    ) {}

    async execute(data: { postId: string; content: string }): Promise<Comment> {
        await this.assertPostExists(data.postId)

        const moderation = await this.moderationPort.moderate(data.content)
        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Comentario bloqueado por moderacion",
            )
        }

        return this.commentsRepository.create({
            postId: data.postId,
            content: data.content,
            source: "comments-module",
        })
    }

    private async assertPostExists(postId: string) {
        const post = await this.postsRepository.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }
    }
}
