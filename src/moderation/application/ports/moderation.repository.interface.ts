import { ProhibitedWord } from "@/moderation/domain/prohibited-word.entity"

export const I_MODERATION_REPOSITORY = "IModerationRepository"

export interface IModerationRepository {
    findAll(): Promise<ProhibitedWord[]>

    create(data: { word: string; category: string }): Promise<ProhibitedWord>

    delete(id: string): Promise<ProhibitedWord>
}
