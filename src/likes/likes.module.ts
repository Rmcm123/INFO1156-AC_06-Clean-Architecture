import { Module } from "@nestjs/common"
import { LikesController } from "@/likes/likes.controller"
import { LikesService } from "@/likes/likes.service"
import { AddLikeUseCase } from "@/likes/application/use-cases/add-like.use-case"
import { I_LIKES_REPOSITORY } from "@/likes/application/ports/likes.repository.interface"
import { PrismaLikesRepository } from "@/likes/infrastructure/prisma-likes.repository"
import { PostsModule } from "@/posts/posts.module"

@Module({
    imports: [PostsModule],
    controllers: [LikesController],
    providers: [
        {
            provide: I_LIKES_REPOSITORY,
            useClass: PrismaLikesRepository,
        },
        AddLikeUseCase,
        LikesService,
    ],
})
export class LikesModule {}
