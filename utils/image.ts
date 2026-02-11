/**
 * Resizes a base64 image string to a maximum dimension while maintaining aspect ratio.
 * @param base64Str The base64 string of the image.
 * @param maxWidth The maximum width.
 * @param maxHeight The maximum height.
 * @returns A promise that resolves to the resized base64 string.
 */
export const resizeImage = (base64Str: string, maxWidth: number = 1024, maxHeight: number = 1024): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height *= maxWidth / width));
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width *= maxHeight / height));
                    height = maxHeight;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.8)); // Use JPEG and 80% quality for better compression
        };
    });
};
