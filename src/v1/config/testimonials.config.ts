import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

export const testimonialConfig = {
  image: {
    path: 'uploads/testimonials',
    maxSize: 1048576, // 10mb
  },
};

export const testimonialFileUploadConfig = {
  // Enable file size limits
  limits: {
    fileSize: testimonialConfig.image.maxSize,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, callback: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      callback(null, true);
    } else {
      // Reject file
      callback(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: `./public/${testimonialConfig.image.path}`,
    // File modification details
    filename: (req, file, callback) =>
      callback(null, `${uuid()}${extname(file.originalname)}`),
  }),
};
