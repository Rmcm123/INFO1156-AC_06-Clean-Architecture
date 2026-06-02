import { Module } from "@nestjs/common"
import { ModerationController } from "@/moderation/moderation.controller"
import { GetProhibitedWordsUseCase } from "@/moderation/application/use-cases/get-prohibited-words.use-case"
import { AddProhibitedWordUseCase } from "@/moderation/application/use-cases/add-prohibited-word.use-case"
import { DeleteProhibitedWordUseCase } from "@/moderation/application/use-cases/delete-prohibited-word.use-case"
import { ModerateContentUseCase } from "@/moderation/application/use-cases/moderate-content.use-case"
import { PrismaModerationRepository } from "@/moderation/infrastructure/prisma-moderation.repository"
import {
    I_MODERATION_REPOSITORY,
} from "@/moderation/application/ports/moderation.repository.interface"
import { PrismaModule } from "@/shared/prisma.module"

@Module({
    imports: [PrismaModule],
    controllers: [ModerationController],
    providers: [
        GetProhibitedWordsUseCase,
        AddProhibitedWordUseCase,
        DeleteProhibitedWordUseCase,
        ModerateContentUseCase,
        {
            provide: I_MODERATION_REPOSITORY,
            useClass: PrismaModerationRepository,
        },
    ],
    exports: [ModerateContentUseCase],
})
export class ModerationModule {}
