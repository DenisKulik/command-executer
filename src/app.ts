import {PromptService} from "./core";
import {ConsoleLogger} from "./out";

export class App {
    async run() {
        const res = await new PromptService().input<number>('Number', 'number')
        const logger = ConsoleLogger.getInstance()
        logger.log(res)
    }
}

const app = new App()
app.run()