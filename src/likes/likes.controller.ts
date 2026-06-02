import { Body, Controller, Param, Post } from "@nestjs/common"
import { AddLikeUseCase } from "@/likes/application/use-cases/add-like.use-case"
import { AddLikeDto } from "@/posts/posts.dtos"

@Controller("api/posts/:id/likes")
export class LikesController {
    constructor(private readonly addLikeUseCase: AddLikeUseCase) {}

    @Post()
    create(@Param("id") postId: string, @Body() body: AddLikeDto) {
        return this.addLikeUseCase.execute({
            postId,
            reactionType: body.reactionType,
            weight: body.weight,
        })
    }
}
