import { FeedPost } from "./post.entity"

export type FeedMode = "latest" | "mostLiked" | "mostCommented" | "relevance"

export interface FeedRankingStrategy {
    rank(posts: FeedPost[]): FeedPost[]
}

export class LatestRankingStrategy implements FeedRankingStrategy {
    rank(posts: FeedPost[]): FeedPost[] {
        return [...posts].sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        )
    }
}

export class MostLikedRankingStrategy implements FeedRankingStrategy {
    rank(posts: FeedPost[]): FeedPost[] {
        return [...posts].sort((a, b) => b.likesCount - a.likesCount)
    }
}

export class MostCommentedRankingStrategy implements FeedRankingStrategy {
    rank(posts: FeedPost[]): FeedPost[] {
        return [...posts].sort((a, b) => b.commentsCount - a.commentsCount)
    }
}

export class RelevanceRankingStrategy implements FeedRankingStrategy {
    rank(posts: FeedPost[]): FeedPost[] {
        return [...posts].sort((a, b) => b.relevanceScore - a.relevanceScore)
    }
}

export class FeedRankingStrategyFactory {
    private readonly latest = new LatestRankingStrategy()
    private readonly mostLiked = new MostLikedRankingStrategy()
    private readonly mostCommented = new MostCommentedRankingStrategy()
    private readonly relevance = new RelevanceRankingStrategy()

    forMode(mode: string): FeedRankingStrategy {
        if (mode === "mostLiked") {
            return this.mostLiked
        }

        if (mode === "mostCommented") {
            return this.mostCommented
        }

        if (mode === "relevance") {
            return this.relevance
        }

        return this.latest
    }
}
