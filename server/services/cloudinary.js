import { v2 as cloudinary } from 'cloudinary';

export const uploadProfileImage = (buffer) => {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        throw new Error(
            'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
        );
    }

    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'ems/employees', resource_type: 'image' },
            (error, result) => {
                if (error) {
                    reject(new Error('Cloudinary could not store the profile image.'));
                    return;
                }

                if (!result?.secure_url) {
                    reject(new Error('Cloudinary did not return a secure image URL.'));
                    return;
                }

                resolve(result.secure_url);
            }
        );

        uploadStream.on('error', () => {
            reject(new Error('Cloudinary could not store the profile image.'));
        });
        uploadStream.end(buffer);
    });
};
