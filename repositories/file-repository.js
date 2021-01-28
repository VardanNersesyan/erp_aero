const { File } = require('../sequelize');
const { BaseRepository } = require('./base-repository');

module.exports.FileRepository = class FileRepository extends BaseRepository {

    MODEL = File;
    fields = [ 'id', 'name', 'extension', 'mimeType', 'size', 'createdAt'];

    create = async ({ name, extension, mimeType, size, path, userId }) => {
        const response = await this.MODEL.create({
            name, extension, mimeType, size, path, userId
        });

        if (!response) {
            return null;
        }

        return response.dataValues;
    }

    updateByIdAndUserId = async (fileId, userId, { name, extension, mimeType, size, path }) => {
        const response = await this.MODEL.update({
            name, extension, mimeType, size, path
        }, {
            where: {
                userId,
                id: fileId
            }
        });

        return !!response;
    }

    getListByUserId = async (userId, page = 1, listSize = 10) => {
        const { limit, offset } = this.getPagination(page, listSize);

        const response = await this.MODEL.findAndCountAll({
            attributes: this.fields,
            where: { userId },
            limit,
            offset
        });

        return this.getPagingData(response, page, listSize);
    }

    getFileByIdAndUserId = async (fileId, userId, fields) => {
        const response = await this.MODEL.findOne({
            attributes: fields || this.fields,
            where: {
                userId,
                id: fileId
            },
        });

        if (!response) {
            return null;
        }

        return response.dataValues;
    }

    deleteFileByIdAndUserId = async (fileId, userId) => {
        const response = await this.MODEL.destroy({
            where: {
                userId,
                id: fileId
            },
        });

        if (!response) {
            return null;
        }

        return response.dataValues;
    }

}