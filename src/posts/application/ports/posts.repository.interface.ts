import { Post, FeedPost } from "../../domain/post.entity"

export const I_POSTS_REPOSITORY = "IPostsRepository"

export interface IPostsRepository {
    create(data: {
        title: string
        description: string
        imageUrl: string
        categoryId?: string
    }): Promise<Post>
    
    findAll(): Promise<Post[]>
    
    findById(id: string): Promise<Post | null>
    
    getFeedPosts(categoryId?: string): Promise<FeedPost[]>
}
