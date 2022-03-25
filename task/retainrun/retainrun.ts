import { IRetainRun } from "./iretainrun";
import { IParameters } from "../helpers/taskhelper/iparameters";
import { IRunRetainer } from "../runretainer/irunretainer";

export class RetainRun implements IRetainRun
{
	private runRetainer: IRunRetainer;

	constructor(runRetainer: IRunRetainer) {
		this.runRetainer = runRetainer;
	}

	public async setRunRetentionLease(parameters: IParameters): Promise<void>
	{
		await this.runRetainer.retain(parameters);

		if (parameters.daysToRetain === 365000)
		{
			console.log(`Retained pipeline run ${parameters.variables.buildId} indefinitely`);
		}
		else
		{
			console.log(`Retained pipeline run ${parameters.variables.buildId} for ${parameters.daysToRetain} days`);
		}
	}
}