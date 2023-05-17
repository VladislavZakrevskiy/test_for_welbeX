import fileUpload from 'express-fileupload';
declare class fileService {
    upload(files: fileUpload.FileArray): string[];
    remove(name: string): string;
}
declare const _default: fileService;
export default _default;
