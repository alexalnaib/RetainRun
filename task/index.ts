import tl = require('azure-pipelines-task-lib/task');
import * as azdev from "azure-devops-node-api/WebApi";

import { IEndpoint } from './helpers/taskhelper/iendpoint';
import { TaskHelper } from './helpers/taskhelper/taskhelper';
import { RetainRun } from './helpers/retainrun/retainrun';
import { IAzureDevOps } from './helpers/azuredevops/iazuredevops';
import { AzureDevOps } from './helpers/azuredevops/azuredevops';
import { ITaskHelper } from './helpers/taskhelper/itaskhelper';
import { IParameters } from './helpers/taskhelper/iparameters';
import { IVariables } from './helpers/taskhelper/ivariables';
import { IRetainRun } from './helpers/retainrun/iretainrun';

async function run() {

	const taskHelper: ITaskHelper = new TaskHelper();
	const azureDevOps: IAzureDevOps = new AzureDevOps();
	const retainRun: IRetainRun = new RetainRun();

	try {

		const endpoint: IEndpoint = await taskHelper.getEndpoint();
		const connection: azdev.WebApi = await azureDevOps.getConnection(endpoint);
		const variables: IVariables = await taskHelper.getVariables();
		const parameters: IParameters = await taskHelper.getParameters();

		await retainRun.setRunRetentionLease(variables.projectName, variables.buildId, variables.definitionId, parameters.daysToRetain, parameters.owner, connection);

		tl.setResult(tl.TaskResult.Succeeded, '');
	}
	catch (error: any) {
		tl.setResult(tl.TaskResult.Failed, error.message);
	}
}

run();
