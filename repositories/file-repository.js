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

}