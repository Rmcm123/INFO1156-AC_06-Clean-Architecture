import { Module } from "@nestjs/common"
import { FeedRankingStrategyFactory } from "@/posts/domain/feed-ranking.strategy"
import { ModerationModule } from "@/moderation/moderation.module"
import { PostsController } from "@/posts/posts.controller"

import { CreatePostUseCase } from "./application/use-cases/create-post.use-case"
import { GetAllPostsUseCase } from "./application/use-cases/get-all-posts.use-case"
import { GetFeedUseCase } from "./application/use-cases/get-feed.use-case"

import { I_POSTS_REPOSITORY } from "./application/ports/posts.repository.interface"
import { I_MODERATION_PORT } from "./application/ports/moderation.port.interface"

import { PrismaPostsRepository } from "./infrastructure/prisma-posts.repository"
import { ModerationAdapter } from "./infrastructure/moderation.adapter"

@Module({
    imports: [ModerationModule],
    controllers: [PostsController],
    providers: [
        FeedRankingStrategyFactory,
        {
            provide: I_POSTS_REPOSITORY,
            useClass: PrismaPostsRepository,
        },
        {
            provide: I_MODERATION_PORT,
            useClass: ModerationAdapter,
        },
        CreatePostUseCase,
        GetAllPostsUseCase,
        GetFeedUseCase,
    ],
    exports: [I_POSTS_REPOSITORY],
})
export class PostsModule {}
