import { IRunRetainer } from "../runretainer/irunretainer";

export interface IWorkerFactory {
	createRunRetainer(): Promise<IRunRetainer>;
}