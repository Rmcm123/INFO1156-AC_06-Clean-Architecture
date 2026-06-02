import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { CreateCommentDto } from "@/posts/posts.dtos"
import { AddCommentUseCase } from "@/comments/application/use-cases/add-comment.use-case"
import { GetCommentsByPostUseCase } from "@/comments/application/use-cases/get-comments-by-post.use-case"

@Controller("api/posts/:id/comments")
export class CommentsController {
    constructor(
        private readonly addCommentUseCase: AddCommentUseCase,
        private readonly getCommentsByPostUseCase: GetCommentsByPostUseCase,
    ) {}

    @Get()
    async list(@Param("id") postId: string) {
        const comments = await this.getCommentsByPostUseCase.execute(postId)

        return {
            total_comments: comments.length,
            comments,
        }
    }

    @Post()
    create(@Param("id") postId: string, @Body() body: CreateCommentDto) {
        return this.addCommentUseCase.execute({
            postId,
            content: body.content,
        })
    }
}
