import { Body, Controller, Get, Post, Query } from "@nestjs/common"

import { CreatePostUseCase } from "@/posts/application/use-cases/create-post.use-case"
import { GetAllPostsUseCase } from "@/posts/application/use-cases/get-all-posts.use-case"
import { GetFeedUseCase } from "@/posts/application/use-cases/get-feed.use-case"
import { CreatePostDto, FeedQueryDto } from "@/posts/posts.dtos"

@Controller("api/posts")
export class PostsController {
    constructor(
        private readonly createPostUseCase: CreatePostUseCase,
        private readonly getAllPostsUseCase: GetAllPostsUseCase,
        private readonly getFeedUseCase: GetFeedUseCase,
    ) {}

    @Post()
    async create(@Body() body: CreatePostDto) {
        const created = await this.createPostUseCase.execute(body)

        return {
            ok: true,
            payload: created,
        }
    }

    @Get()
    async findAll() {
        const posts = await this.getAllPostsUseCase.execute()

        return {
            total: posts.length,
            items: posts,
        }
    }

    @Get("feed")
    async getFeed(@Query() query: FeedQueryDto) {
        const mode = query.mode ?? "latest"
        const rankedPosts = await this.getFeedUseCase.execute(mode, query.categoryId)

        return {
            mode,
            count: rankedPosts.length,
            rows: rankedPosts,
        }
    }
}
