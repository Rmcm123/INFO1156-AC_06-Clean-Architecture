import { Inject, Injectable, BadRequestException } from "@nestjs/common"
import { IPostsRepository, I_POSTS_REPOSITORY } from "../ports/posts.repository.interface"
import { IModerationPort, I_MODERATION_PORT } from "../ports/moderation.port.interface"
import { Post } from "../../domain/post.entity"

@Injectable()
export class CreatePostUseCase {
    constructor(
        @Inject(I_POSTS_REPOSITORY)
        private readonly postsRepository: IPostsRepository,
        @Inject(I_MODERATION_PORT)
        private readonly moderationPort: IModerationPort,
    ) {}

    async execute(data: {
        title: string
        description: string
        imageUrl: string
        categoryId?: string
    }): Promise<Post> {
        const text = `${data.title} ${data.description}`
        const moderation = await this.moderationPort.moderate(text)

        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Post bloqueado por moderación",
            )
        }

        return await this.postsRepository.create(data)
    }
}
