import { Inject, Injectable } from "@nestjs/common"
import {
    IModerationRepository,
    I_MODERATION_REPOSITORY,
} from "@/moderation/application/ports/moderation.repository.interface"

export type ModerationResult = {
    approved: boolean
    reason?: string
    category?: string
}

@Injectable()
export class ModerateContentUseCase {
    constructor(
        @Inject(I_MODERATION_REPOSITORY)
        private readonly moderationRepository: IModerationRepository,
    ) {}

    async execute(text: string): Promise<ModerationResult> {
        const prohibitedWords = await this.moderationRepository.findAll()

        for (const pw of prohibitedWords) {
            const regex = this.buildFuzzyRegex(pw.word)
            if (regex.test(text)) {
                return {
                    approved: false,
                    reason: `Contiene palabra prohibida: "${pw.word}"`,
                    category: pw.category,
                }
            }
        }

        return { approved: true }
    }

    private buildFuzzyRegex(word: string): RegExp {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        return new RegExp(escaped.split("").join("[^a-zA-Z0-9]*"), "gi")
    }
}
