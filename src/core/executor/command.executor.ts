import {IStreamLogger} from "../handlers";
import {ChildProcessWithoutNullStreams} from "node:child_process";
import {ICommandExec} from "./command.types";

export abstract class CommandExecutor<Input> {
    constructor(private logger: IStreamLogger) {
    }

    public async execute() {
        const input = await this.prompt()
        const command = this.build(input)
        const process = this.spawn(command)
        this.processStream(process, this.logger)
        this.logger.end()
    }

    protected abstract prompt(): Promise<Input>

    protected abstract build(input: Input): ICommandExec

    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams

    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void
}
