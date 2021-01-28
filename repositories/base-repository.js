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

    getPagination = (page = 1, size = 10) => {
        const limit = +size ? +size : 3;
        const offset = page > 1 ? (+page - 1) * limit : 0;

        return { limit, offset };
    };

    getPagingData = (data, page = 1, limit = 10) => {
        const { count: totalItems, rows } = data;
        const currentPage = +page > 1 ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            total_items: totalItems,
            data: rows,
            total_pages: totalPages,
            current_page: currentPage
        };
    }
}