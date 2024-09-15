"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegExecutor = void 0;
const core_1 = require("../../core");
const ffmpeg_builder_1 = require("./ffmpeg.builder");
const node_child_process_1 = require("node:child_process");
class FfmpegExecutor extends core_1.CommandExecutor {
    constructor(logger) {
        super(logger);
        this.fileService = new core_1.FileService();
        this.promptService = new core_1.PromptService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const width = yield this.promptService.input('Video width', 'number');
            const height = yield this.promptService.input('Video height', 'number');
            const path = yield this.promptService.input('Video path', 'input');
            const name = yield this.promptService.input('Video name', 'input');
            return { width, height, path, name };
        });
    }
    build({ width, height, path, name }) {
        const output = this.fileService.gerFilePath(path, name, 'mp4');
        const args = new ffmpeg_builder_1.FfmpegBuilder()
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return { command: 'ffmpeg', args, output };
    }
    spawn({ command, args, output }) {
        this.fileService.deleteFileIfExist(output);
        return (0, node_child_process_1.spawn)(command, args);
    }
    processStream(stream, logger) {
        const handler = new core_1.StreamHandler(logger);
        handler.processOutput(stream);
    }
}
exports.FfmpegExecutor = FfmpegExecutor;
