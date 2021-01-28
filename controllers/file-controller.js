const { FileRepository } = require('../repositories/file-repository');
const FileManager = require('../helpers/file-manager');

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

        const fileName = file.originalname;
        const fileExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        const fileMimeType = file.mimetype;
        const fileSize = file.size;

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