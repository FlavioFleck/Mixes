import Block from "../models/Block.js"
import BlockRepository from "../repositories/BlockRepository.js";

export default class BlockService {
    constructor(connection) {
        this.blockReporitory = new BlockRepository(connection)
    }

    async createBlock(payload) {
        const block = new Block(payload)
        const result = await this.blockReporitory.add(block)
        return result
    }

    async deleteBlock(payload) {
        const result = await this.blockReporitory.delete(payload)
        return result
    }
}