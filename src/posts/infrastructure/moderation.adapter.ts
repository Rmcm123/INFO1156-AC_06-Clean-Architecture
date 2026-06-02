import { Injectable } from "@nestjs/common"
import { IModerationPort } from "../application/ports/moderation.port.interface"
import { ModerateContentUseCase } from "@/moderation/application/use-cases/moderate-content.use-case"

@Injectable()
export class ModerationAdapter implements IModerationPort {
    constructor(private readonly moderateContentUseCase: ModerateContentUseCase) {}

    async moderate(text: string): Promise<{ approved: boolean; reason?: string }> {
        return await this.moderateContentUseCase.execute(text)
    }
}
