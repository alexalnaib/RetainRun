import { NewRetentionLease } from "azure-devops-node-api/interfaces/BuildInterfaces";
import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { WebApi } from "azure-devops-node-api";
import { IRetainRun } from "./iretainrun";

export class RetainRun implements IRetainRun
{
	public async setRunRetentionLease(teamProject: string, runId: number, definitionId: number, daysValid: number, owner: string, connection: WebApi): Promise<void>
	{
		const retentionLease: NewRetentionLease[] = [];

		retentionLease.push({
			runId: runId,
			definitionId: definitionId,
			protectPipeline:  true,
			daysValid: daysValid,
			ownerId: owner,
		});

		const buildApi: IBuildApi = await connection.getBuildApi();
		await buildApi.addRetentionLeases(retentionLease, teamProject);

		console.log(`Retained pipeline run ${runId}`);
	}
}