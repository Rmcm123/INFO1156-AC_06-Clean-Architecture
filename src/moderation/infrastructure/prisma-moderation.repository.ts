import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { ProhibitedWord } from "@/moderation/domain/prohibited-word.entity"
import { IModerationRepository } from "@/moderation/application/ports/moderation.repository.interface"

@Injectable()
export class PrismaModerationRepository implements IModerationRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<ProhibitedWord[]> {
        const words = await this.prisma.prohibitedWord.findMany({
            orderBy: { createdAt: "desc" },
        })

        return words.map(
            (word) =>
                new ProhibitedWord(
                    word.id,
                    word.word,
                    word.category,
                    word.createdAt,
                    word.updatedAt,
                ),
        )
    }

    async create(data: { word: string; category: string }): Promise<ProhibitedWord> {
        const word = await this.prisma.prohibitedWord.create({
            data: { word: data.word, category: data.category },
        })

        return new ProhibitedWord(
            word.id,
            word.word,
            word.category,
            word.createdAt,
            word.updatedAt,
        )
    }

    async delete(id: string): Promise<ProhibitedWord> {
        try {
            const word = await this.prisma.prohibitedWord.delete({ where: { id } })

            return new ProhibitedWord(
                word.id,
                word.word,
                word.category,
                word.createdAt,
                word.updatedAt,
            )
        } catch (err: unknown) {
            if (
                err instanceof Error &&
                "code" in err &&
                (err as { code: string }).code === "P2025"
            ) {
                throw new NotFoundException("Palabra prohibida no encontrada")
            }
            throw err
        }
    }
}
