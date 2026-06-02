export class Comment {
    constructor(
        public id: string,
        public postId: string,
        public content: string,
        public source: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
