import { IParameters } from "../helpers/taskhelper/iparameters";

export interface IRetainRun
{
	setRunRetentionLease(parameters: IParameters): Promise<void>
}