import { Injectable } from "@nestjs/common"
import { ModerateContentUseCase } from "@/moderation/application/use-cases/moderate-content.use-case"
import {
    CommentModerationResult,
    ICommentModerationPort,
} from "@/comments/application/ports/comment-moderation.port.interface"

@Injectable()
export class CommentModerationAdapter implements ICommentModerationPort {
    constructor(private readonly moderateContentUseCase: ModerateContentUseCase) {}

    moderate(text: string): Promise<CommentModerationResult> {
        return this.moderateContentUseCase.execute(text)
    }
}
