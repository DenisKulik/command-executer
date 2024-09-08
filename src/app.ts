import {PromptService} from "./core";

export class App {
    async run() {
        const res = await new PromptService().input<number>('Number', 'number')
        console.log(res)
    }
}

const app = new App()
app.run()