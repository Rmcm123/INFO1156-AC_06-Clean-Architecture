import { Injectable } from "@nestjs/common"
import { CreateCommentDto } from "@/posts/posts.dtos"
import { AddCommentUseCase } from "@/comments/application/use-cases/add-comment.use-case"
import { GetCommentsByPostUseCase } from "@/comments/application/use-cases/get-comments-by-post.use-case"

@Injectable()
export class CommentsService {
    constructor(
        private readonly addCommentUseCase: AddCommentUseCase,
        private readonly getCommentsByPostUseCase: GetCommentsByPostUseCase,
    ) {}

    async listByPostId(postId: string) {
        const comments = await this.getCommentsByPostUseCase.execute(postId)

        return {
            total_comments: comments.length,
            comments,
        }
    }

    async create(postId: string, data: CreateCommentDto) {
        return this.addCommentUseCase.execute({
            postId,
            content: data.content,
        })
    }
}
