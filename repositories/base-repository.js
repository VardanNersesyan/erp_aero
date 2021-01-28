module.exports.BaseRepository = class BaseRepository {

    getById = async (id) => {
        const response = await this.MODEL.findOne({
            where: { id }
        });

        if (!response) {
            return null;
        }

        return response.dataValues;
    }
}