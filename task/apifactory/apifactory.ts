import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { IRequestHandler, IRequestOptions } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import { IEndpoint } from "../helpers/taskhelper/iendpoint";
import { IApiFactory } from "./iapifactory";

export class ApiFactory implements IApiFactory {

	private webApi: WebApi;

	constructor(endpoint: IEndpoint) {

		const requestOptions: IRequestOptions = {

			socketTimeout: 10000,
			allowRetries: true,
			maxRetries: 3
		}

		const auth: IRequestHandler = getPersonalAccessTokenHandler(endpoint.token);
		this.webApi = new WebApi(endpoint.url, auth, requestOptions);
	}

	public async createBuildApi(): Promise<IBuildApi> {

		const buildApi: IBuildApi = await this.webApi.getBuildApi()

		return buildApi;
	}
}