import {join, isAbsolute, dirname} from 'path'
import {promises} from "fs";

export class FileService {
    private async isExist(path: string): Promise<boolean> {
        try {
            await promises.stat(path)
            return true
        } catch {
            return false
        }
    }

    public gerFilePath(path: string, name: string, ext: string): string {
        if (!isAbsolute(path)) {
            path = join(__dirname + '/' + path)
        }
        return join(dirname(path) + '/' + name + '.' + ext)
    }

    async deleteFileIfExist(path: string): Promise<void> {
        if (await this.isExist(path)) {
            await promises.unlink(path)
        }
    }
}