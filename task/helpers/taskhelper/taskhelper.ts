import { getEndpointUrl, getEndpointAuthorizationParameter, getInput, getVariable } from "azure-pipelines-task-lib/task";

import { IEndpoint } from "./iendpoint";
import { IParameters } from "./iparameters";
import { ITaskHelper } from "./itaskhelper";
import { IVariables } from "./ivariables";


export class TaskHelper implements ITaskHelper
{
	public async getEndpoint(): Promise<IEndpoint>
	{
		// Use upper-case default system endpoint name
		// For compatibility with non-Windows systems
		let endpointName: string = "SYSTEMVSSCONNECTION";
		let token: string = "AccessToken";

		let endpointUrl: string | undefined = getEndpointUrl(endpointName, true);

		if (!endpointUrl)
		{
			throw new Error(`Unable to get <${endpointName}> endpoint URL`);
		}

		const endpointToken: string | undefined = getEndpointAuthorizationParameter(endpointName, token, true);

		if (!endpointToken)
		{
			throw new Error(`Unable to get <${endpointName}> (${token}) endpoint token`);
		}

		const endpoint: IEndpoint = {

			url: endpointUrl,
			token: endpointToken,

		};

		return endpoint;
	}

	public async getVariables(): Promise<IVariables>
	{
		const projectName: string | undefined = getVariable("System.TeamProject");
		const buildId: string | undefined = getVariable("Build.BuildId");
		const definitionId: string | undefined = getVariable("System.DefinitionId");

		if (projectName === undefined)
		{
			throw Error(`Input ${projectName} project name is empty`);
		}

		if (buildId === undefined)
		{
			throw Error(`Input ${buildId} build ID is empty`);
		}

		if (definitionId === undefined)
		{
			throw Error(`Input ${definitionId} definition ID is empty`);
		}

		const variables: IVariables = {

			projectName: projectName ? projectName : "Unknown",
			buildId: Number(buildId) ? Number(buildId) : 0,
			definitionId: Number(definitionId) ? Number(definitionId) : 0
		}
	
		return variables;
	}

	public async getParameters(): Promise<IParameters>
	{
		const daysToRetain: string = getInput("days", true)!;
		const owner = `Pipeline: 'Retain Run Task'`;
		let daysValid = 0;

		if (daysToRetain === undefined)
		{
			throw Error(`Input ${daysToRetain} is empty`);
		}

		let parameters: IParameters = {
			daysToRetain: Number(daysToRetain),
			owner: owner
		};

		if (parameters.daysToRetain === 0)
		{
			daysValid = 365000;
		}
		else
		{
			daysValid = parameters.daysToRetain;
		}

		parameters.daysToRetain = daysValid;

		return parameters;
	}
}