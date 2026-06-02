import { Inject, Injectable } from "@nestjs/common"
import {
    IModerationRepository,
    I_MODERATION_REPOSITORY,
} from "@/moderation/application/ports/moderation.repository.interface"
import { ProhibitedWord } from "@/moderation/domain/prohibited-word.entity"

@Injectable()
export class DeleteProhibitedWordUseCase {
    constructor(
        @Inject(I_MODERATION_REPOSITORY)
        private readonly moderationRepository: IModerationRepository,
    ) {}

    async execute(id: string): Promise<ProhibitedWord> {
        return this.moderationRepository.delete(id)
    }
}
