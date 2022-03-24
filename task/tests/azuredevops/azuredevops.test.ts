import * as chai from "chai";

import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import { IRequestHandler, IRequestOptions } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import { IEndpoint } from "../../helpers/taskhelper/iendpoint";
import { IAzureDevOps } from "../../helpers/azuredevops/iazuredevops";
import { AzureDevOps } from "../../helpers/azuredevops/azuredevops";

describe("AzureDevops", async () => {

	const endpointMock = {
		url: `https://my.project.uri`,
		token: `My-Secret-Token`
	} as IEndpoint;

	const requestOptionsMock = {
		socketTimeout: 10000,
		allowRetries: true,
		maxRetries: 3
	} as IRequestOptions;

	const azureDevOps: IAzureDevOps = new AzureDevOps();

	it("Should return a connection", async () => {

		//#region Arrange

		const accessTokenMock: IRequestHandler = getPersonalAccessTokenHandler(endpointMock.token);
		const connectionMock = new WebApi(endpointMock.url, accessTokenMock, requestOptionsMock);

		//#end region

		//#region ACT

		const result = await azureDevOps.getConnection(endpointMock);

		//#end region

		//#region ASSERT

		chai.expect(azureDevOps.getConnection).to.not.throw;
		chai.expect(result).to.not.eq(null);
		chai.expect(result.authHandler.canHandleAuthentication).to.eq(connectionMock.authHandler.canHandleAuthentication);

		//#end region
	});
});