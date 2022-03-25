import { IParameters } from "../helpers/taskhelper/iparameters";

export interface IRunRetainer {

	retain(parameters: IParameters): Promise<void>;
}