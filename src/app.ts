import {ConsoleLogger} from "./out";
import {FfmpegExecutor} from "./commands";

export class App {
    async run() {
        new FfmpegExecutor(ConsoleLogger.getInstance()).execute()
    }
}

const app = new App()
app.run()