import { IEndpoint } from "./iendpoint";
import { IParameters } from "./iparameters";
import { IVariables } from "./ivariables";

export interface ITaskHelper
{
	getEndpoint(): Promise<IEndpoint>;
	getParameters(): Promise<IParameters>;
	getVariables(): Promise<IVariables>;
}