export const I_COMMENT_MODERATION_PORT = "ICommentModerationPort"

export type CommentModerationResult = {
    approved: boolean
    reason?: string
    category?: string
}

export interface ICommentModerationPort {
    moderate(text: string): Promise<CommentModerationResult>
}
