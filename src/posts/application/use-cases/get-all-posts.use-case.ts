import { Inject, Injectable } from "@nestjs/common"
import { IPostsRepository, I_POSTS_REPOSITORY } from "../ports/posts.repository.interface"
import { Post } from "../../domain/post.entity"

@Injectable()
export class GetAllPostsUseCase {
    constructor(
        @Inject(I_POSTS_REPOSITORY)
        private readonly postsRepository: IPostsRepository,
    ) {}

    async execute(): Promise<Post[]> {
        return await this.postsRepository.findAll()
    }
}
