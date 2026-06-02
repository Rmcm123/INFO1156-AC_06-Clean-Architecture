export class ProhibitedWord {
    constructor(
        public id: string,
        public word: string,
        public category: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
