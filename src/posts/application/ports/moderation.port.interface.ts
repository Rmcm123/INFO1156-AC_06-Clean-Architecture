export const I_MODERATION_PORT = "IModerationPort"

export interface IModerationPort {
    moderate(text: string): Promise<{
        approved: boolean
        reason?: string
    }>
}
