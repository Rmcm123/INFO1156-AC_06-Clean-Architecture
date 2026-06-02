import { Injectable } from "@nestjs/common"
import { ModerationService } from "@/moderation/moderation.service"
import {
    CommentModerationResult,
    ICommentModerationPort,
} from "@/comments/application/ports/comment-moderation.port.interface"

@Injectable()
export class CommentModerationAdapter implements ICommentModerationPort {
    constructor(private readonly moderationService: ModerationService) {}

    moderate(text: string): Promise<CommentModerationResult> {
        return this.moderationService.moderate(text)
    }
}
