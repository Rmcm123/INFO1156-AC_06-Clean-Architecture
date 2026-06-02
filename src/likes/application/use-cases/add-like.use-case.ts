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
import { Like } from "@/likes/domain/like.entity"
import {
    ILikesRepository,
    I_LIKES_REPOSITORY,
} from "@/likes/application/ports/likes.repository.interface"

@Injectable()
export class AddLikeUseCase {
    constructor(
        @Inject(I_LIKES_REPOSITORY)
        private readonly likesRepository: ILikesRepository,
        @Inject(I_POSTS_REPOSITORY)
        private readonly postsRepository: IPostsRepository,
    ) {}

    async execute(data: {
        postId: string
        reactionType?: string
        weight?: number
    }): Promise<Like> {
        const post = await this.postsRepository.findById(data.postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }

        const weight = data.weight ?? 1
        if (weight < 1) {
            throw new BadRequestException("El peso debe ser al menos 1")
        }

        return this.likesRepository.create({
            postId: data.postId,
            reactionType: data.reactionType ?? "like",
            weight,
            source: "likes-module",
        })
    }
}
