import { Inject, Injectable } from "@nestjs/common"
import { IPostsRepository, I_POSTS_REPOSITORY } from "../ports/posts.repository.interface"
import { FeedRankingStrategyFactory } from "../../domain/feed-ranking.strategy"
import { FeedPost } from "../../domain/post.entity"

@Injectable()
export class GetFeedUseCase {
    constructor(
        @Inject(I_POSTS_REPOSITORY)
        private readonly postsRepository: IPostsRepository,
        private readonly feedRankingFactory: FeedRankingStrategyFactory,
    ) {}

    async execute(mode: string, categoryId?: string): Promise<FeedPost[]> {
        const feedPosts = await this.postsRepository.getFeedPosts(categoryId)
        return this.feedRankingFactory.forMode(mode).rank(feedPosts)
    }
}
