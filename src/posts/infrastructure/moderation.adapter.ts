import { Injectable } from "@nestjs/common"
import { IModerationPort } from "../application/ports/moderation.port.interface"
import { ModerationService } from "@/moderation/moderation.service"

@Injectable()
export class ModerationAdapter implements IModerationPort {
    constructor(private readonly moderationService: ModerationService) {}

    async moderate(text: string): Promise<{ approved: boolean; reason?: string }> {
        return await this.moderationService.moderate(text)
    }
}
