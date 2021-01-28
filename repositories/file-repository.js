const { File } = require('../sequelize');
const { BaseRepository } = require('./base-repository');

module.exports.FileRepository = class FileRepository extends BaseRepository {

    MODEL = File;

    create = async ({ name, extension, mimeType, size, path, userId }) => {
        const response = await this.MODEL.create({
            name, extension, mimeType, size, path, userId
        });

        if (!response) {
            return null;
        }

        return response.dataValues;
    }

    getListByUserId = async (userId, page = 1, listSize = 10) => {
        const { limit, offset } = this.getPagination(page, listSize);

        const response = await this.MODEL.findAndCountAll({
            where: { userId },
            limit,
            offset
        });

        return this.getPagingData(response, page, listSize);
    }

}