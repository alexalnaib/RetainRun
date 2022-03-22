import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import { IRequestHandler, IRequestOptions } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import { IEndpoint } from "../taskhelper/iendpoint";
import { IAzureDevOps } from "./iazuredevops";

export class AzureDevOps implements IAzureDevOps
{
	public async getConnection(endpoint: IEndpoint): Promise<WebApi>
	{
		const accessTokenHandler: IRequestHandler = getPersonalAccessTokenHandler(endpoint.token);

		const requestOptions: IRequestOptions = {
			socketTimeout: 10000,
			allowRetries: true,
			maxRetries: 3
		};

		const connection = new WebApi(endpoint.url, accessTokenHandler, requestOptions);

		if (!connection)
		{
			throw Error(`Connection cannot be made to Azure DevOps.`);
		}

		return connection;
	}
}