import { Like } from "@/likes/domain/like.entity"

export const I_LIKES_REPOSITORY = "ILikesRepository"

export interface ILikesRepository {
    create(data: {
        postId: string
        reactionType: string
        weight: number
        source: string
    }): Promise<Like>
}
