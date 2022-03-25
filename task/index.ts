import tl = require('azure-pipelines-task-lib/task');

import { IEndpoint } from './helpers/taskhelper/iendpoint';
import { TaskHelper } from './helpers/taskhelper/taskhelper';
import { RetainRun } from './retainrun/retainrun';
import { ITaskHelper } from './helpers/taskhelper/itaskhelper';
import { IParameters } from './helpers/taskhelper/iparameters';
import { IRetainRun } from './retainrun/iretainrun';
import { ApiFactory } from './apifactory/apifactory';
import { IApiFactory } from './apifactory/iapifactory';
import { IWorkerFactory } from './workerfactory/iworkerfactory';
import { WorkerFactory } from './workerfactory/workerfactory';
import { IRunRetainer } from './runretainer/irunretainer';

async function run() {

	const taskHelper: ITaskHelper = new TaskHelper();

	try {

		const endpoint: IEndpoint = await taskHelper.getEndpoint();
		const parameters: IParameters = await taskHelper.getParameters();

		const apiFactory: IApiFactory = new ApiFactory(endpoint);
		const workerFactory: IWorkerFactory = new WorkerFactory(apiFactory);

		const runRetainer: IRunRetainer = await workerFactory.createRunRetainer();

		const retainRun: IRetainRun = new RetainRun(runRetainer);

		await retainRun.setRunRetentionLease(parameters);

		tl.setResult(tl.TaskResult.Succeeded, '');
	}
	catch (error: any) {
		tl.setResult(tl.TaskResult.Failed, error.message);
	}
}

run();
