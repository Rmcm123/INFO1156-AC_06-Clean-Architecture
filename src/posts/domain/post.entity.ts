export class Post {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public imageUrl: string,
        public categoryId: string | null,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}

export class FeedPost {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public imageUrl: string,
        public categoryId: string | null,
        public category: string | null,
        public createdAt: Date,
        public updatedAt: Date,
        public likesCount: number,
        public commentsCount: number,
        public relevanceScore: number,
    ) {}
}
