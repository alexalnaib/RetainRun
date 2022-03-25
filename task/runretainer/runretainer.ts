import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { NewRetentionLease } from "azure-devops-node-api/interfaces/BuildInterfaces";
import { IParameters } from "../helpers/taskhelper/iparameters";
import { IRunRetainer } from "./irunretainer";

export class RunRetainer implements IRunRetainer {

	private buildApi: IBuildApi;

	constructor(buildApi: IBuildApi) {
		
		this.buildApi = buildApi;
	}

	public async retain(parameters: IParameters): Promise<void> {

		const retentionLease: NewRetentionLease[] = [];

		retentionLease.push({
			runId: parameters.variables.buildId,
			definitionId: parameters.variables.definitionId,
			protectPipeline:  true,
			daysValid: parameters.daysToRetain,
			ownerId: parameters.variables.owner
		});

		this.buildApi.addRetentionLeases(retentionLease, parameters.variables.projectName);
	}
}