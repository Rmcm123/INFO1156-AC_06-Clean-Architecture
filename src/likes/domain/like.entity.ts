export class Like {
    constructor(
        public id: string,
        public postId: string,
        public reactionType: string,
        public weight: number,
        public source: string,
        public createdAt: Date,
    ) {}
}
