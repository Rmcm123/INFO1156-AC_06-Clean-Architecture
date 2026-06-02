import { Injectable } from "@nestjs/common"
import { AddLikeUseCase } from "@/likes/application/use-cases/add-like.use-case"
import { AddLikeDto } from "@/posts/posts.dtos"

@Injectable()
export class LikesService {
    constructor(private readonly addLikeUseCase: AddLikeUseCase) {}

    async create(postId: string, data: AddLikeDto) {
        return this.addLikeUseCase.execute({
            postId,
            reactionType: data.reactionType,
            weight: data.weight,
        })
    }
}
