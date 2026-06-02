import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { CreateProhibitedWordDto } from "@/moderation/moderation.dtos"
import { GetProhibitedWordsUseCase } from "@/moderation/application/use-cases/get-prohibited-words.use-case"
import { AddProhibitedWordUseCase } from "@/moderation/application/use-cases/add-prohibited-word.use-case"
import { DeleteProhibitedWordUseCase } from "@/moderation/application/use-cases/delete-prohibited-word.use-case"

@Controller("api/admin/prohibited-words")
export class ModerationController {
    constructor(
        private readonly getProhibitedWordsUseCase: GetProhibitedWordsUseCase,
        private readonly addProhibitedWordUseCase: AddProhibitedWordUseCase,
        private readonly deleteProhibitedWordUseCase: DeleteProhibitedWordUseCase,
    ) {}

    @Get()
    async findAll() {
        return this.getProhibitedWordsUseCase.execute()
    }

    @Post()
    async create(@Body() body: CreateProhibitedWordDto) {
        return this.addProhibitedWordUseCase.execute({
            word: body.word,
            category: body.category,
        })
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.deleteProhibitedWordUseCase.execute(id)
    }
}
