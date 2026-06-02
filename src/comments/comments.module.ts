import { Module } from "@nestjs/common"
import { CommentsController } from "@/comments/comments.controller"
import { CommentsService } from "@/comments/comments.service"
import { AddCommentUseCase } from "@/comments/application/use-cases/add-comment.use-case"
import { GetCommentsByPostUseCase } from "@/comments/application/use-cases/get-comments-by-post.use-case"
import { I_COMMENTS_REPOSITORY } from "@/comments/application/ports/comments.repository.interface"
import { I_COMMENT_MODERATION_PORT } from "@/comments/application/ports/comment-moderation.port.interface"
import { PrismaCommentsRepository } from "@/comments/infrastructure/prisma-comments.repository"
import { CommentModerationAdapter } from "@/comments/infrastructure/comment-moderation.adapter"
import { ModerationModule } from "@/moderation/moderation.module"
import { PostsModule } from "@/posts/posts.module"

@Module({
    imports: [PostsModule, ModerationModule],
    controllers: [CommentsController],
    providers: [
        {
            provide: I_COMMENTS_REPOSITORY,
            useClass: PrismaCommentsRepository,
        },
        {
            provide: I_COMMENT_MODERATION_PORT,
            useClass: CommentModerationAdapter,
        },
        AddCommentUseCase,
        GetCommentsByPostUseCase,
        CommentsService,
    ],
})
export class CommentsModule {}
