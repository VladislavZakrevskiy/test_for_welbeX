import * as fs from 'fs'
import {} from 'connect-busboy'
import path from 'path';
import fileUpload from 'express-fileupload';
import * as uuid from 'uuid'


 class fileService {

    upload (files: fileUpload.FileArray) {
        const filesDir = path.resolve(__dirname, '../files')
        if(!fs.existsSync(filesDir)){
            fs.mkdirSync(filesDir, {recursive: true})
        }
        if (!files || Object.keys(files).length === 0) {
            console.log('no files')
            return []
        }
        const names: string[] = []
        Object.keys(files).map( (fileName) => {
            const file = files[fileName]
            //@ts-ignore
            const mimetype = file.mimetype.split('/')[1]
            const name: string = `${uuid.v4()}.${mimetype}`
            //@ts-ignore
            file.mv(path.resolve(__dirname, '../files', name))
            names.push(name)
        })
        return names
    }

    remove (name: string) {
        fs.unlinkSync(path.resolve(__dirname, '../files', name))
        return name
    }
}

export default new fileService()