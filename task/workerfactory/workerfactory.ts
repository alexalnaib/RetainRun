import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { IApiFactory } from "../apifactory/iapifactory";
import { IRunRetainer } from "../runretainer/irunretainer";
import { RunRetainer } from "../runretainer/runretainer";

export class WorkerFactory {

	private apiFactory: IApiFactory;

	constructor(apiFactory: IApiFactory) {

		this.apiFactory = apiFactory;
	}

	public async createRunRetainer(): Promise<IRunRetainer> {

		const buildApi: IBuildApi = await this.apiFactory.createBuildApi();

		return new RunRetainer(buildApi);
	}
}