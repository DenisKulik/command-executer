import {CommandExecutor, FileService, ICommandExec, IStreamLogger, PromptService, StreamHandler} from "../../core";
import {ICommandExecFfmpeg, IFfmpegInput} from "./ffmpeg.types";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {ChildProcessWithoutNullStreams, spawn} from "node:child_process";


export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService()
    private promptService: PromptService = new PromptService()

    constructor(logger: IStreamLogger) {
        super(logger)
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Video width', 'number')
        const height = await this.promptService.input<number>('Video height', 'number')
        const path = await this.promptService.input<string>('Video path', 'input')
        const name = await this.promptService.input<string>('Video name', 'input')

        return {width, height, path, name}
    }

    protected build({width, height, path, name}: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.gerFilePath(path, name, 'mp4')
        const args = new FfmpegBuilder()
            .input(path)
            .setVideoSize(width, height)
            .output(output)

        return {command: 'ffmpeg', args, output}
    }

    protected spawn({command, args, output}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExist(output)
        return spawn(command, args)
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger) {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }
}