import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import {
    IPostsRepository,
    I_POSTS_REPOSITORY,
} from "@/posts/application/ports/posts.repository.interface"
import { Comment } from "@/comments/domain/comment.entity"
import {
    ICommentsRepository,
    I_COMMENTS_REPOSITORY,
} from "@/comments/application/ports/comments.repository.interface"

@Injectable()
export class GetCommentsByPostUseCase {
    constructor(
        @Inject(I_COMMENTS_REPOSITORY)
        private readonly commentsRepository: ICommentsRepository,
        @Inject(I_POSTS_REPOSITORY)
        private readonly postsRepository: IPostsRepository,
    ) {}

    async execute(postId: string): Promise<Comment[]> {
        const post = await this.postsRepository.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }

        return this.commentsRepository.findByPostId(postId)
    }
}
