const { FileRepository } = require('../repositories/file-repository');
const FileManager = require('../helpers/file-manager');

const fileData = (file) => {
    const fileName = file.originalname;
    const fileExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    const fileMimeType = file.mimetype;
    const fileSize = file.size;

    return {
        fileName, fileExt, fileMimeType, fileSize
    }
}

exports.upload = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'File is required field'
                });
        }

        const { fileName, fileExt, fileMimeType, fileSize } = fileData(file);

        const filePath = await FileManager.write('files', file);

        const FileRep = new FileRepository();
        const response = await FileRep.create({
            name: fileName,
            extension: fileExt,
            mimeType: fileMimeType,
            size: fileSize,
            path: filePath,
            userId: req.userId
        });

        res.json({
            success: !!response
        });
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const { list_size = 10, page = 1 } = req.query;
        const FileRep = new FileRepository();
        const response = await FileRep.getListByUserId(req.userId, page, list_size);

        res.json({
            success: true,
            ...response
        });
    } catch (err) {
        next(err);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const FileRep = new FileRepository();
        const response = await FileRep.getFileByIdAndUserId(req.params.fileId, req.userId);

        res.json({
            success: true,
            data: response
        });
    } catch (err) {
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const FileRep = new FileRepository();
        const oldData = await FileRep.getFileByIdAndUserId(req.params.fileId, req.userId, ['path']);
        if (!oldData) {
            return res.status(404)
                .json({
                    success: false,
                    message: "file not found!"
                });
        }
        await FileRep.deleteFileByIdAndUserId(req.params.fileId, req.userId);
        await FileManager.remove(oldData.path)

        res.json({
            success: true,
        });
    } catch (err) {
        next(err);
    }
}

exports.update = async (req, res, next) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'File is required field'
                });
        }

        const { fileName, fileExt, fileMimeType, fileSize } = fileData(file);

        const filePath = await FileManager.write('files', file);

        const FileRep = new FileRepository();
        const oldData = await FileRep.getFileByIdAndUserId(req.params.fileId, req.userId, ['path']);
        if (!oldData) {
            return res.status(404)
                .json({
                    success: false,
                    message: "file not found!"
                });
        }

        await FileRep.updateByIdAndUserId(req.params.fileId, req.userId, {
            name: fileName,
            extension: fileExt,
            mimeType: fileMimeType,
            size: fileSize,
            path: filePath,
        })

        await FileManager.remove(oldData.path)
        res.json({
            success: true,
        });
    } catch (err) {
        next(err);
    }
}

exports.download = async (req, res, next) => {
    try {
        const FileRep = new FileRepository();
        const response = await FileRep.getFileByIdAndUserId(req.params.fileId, req.userId, ['path']);

        if (!response) {
            return res.status(404)
                .json({
                    success: false,
                    message: "File not found!"
                });
        }

        const file = `${process.cwd()}/${response.path}`;
        res.download(file);
    } catch (err) {
        next(err);
    }
}