import { Comment } from "@/comments/domain/comment.entity"

export const I_COMMENTS_REPOSITORY = "ICommentsRepository"

export interface ICommentsRepository {
    findByPostId(postId: string): Promise<Comment[]>

    create(data: {
        postId: string
        content: string
        source: string
    }): Promise<Comment>
}
