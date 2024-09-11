"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamHandler = void 0;
class StreamHandler {
    constructor(logger) {
        this.logger = logger;
    }
    processOutput(stream) {
        var _a, _b;
        (_a = stream.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            this.logger.log(data.toString());
        });
        (_b = stream.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            this.logger.error(data.toString());
        });
        stream.on('close', () => {
            this.logger.end();
        });
    }
}
exports.StreamHandler = StreamHandler;
