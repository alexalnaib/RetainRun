import { WebApi } from "azure-devops-node-api";
import { IEndpoint } from "../taskhelper/iendpoint";

export interface IAzureDevOps
{
	getConnection(endpoint: IEndpoint): Promise<WebApi>;
}