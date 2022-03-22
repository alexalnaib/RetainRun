import { WebApi } from "azure-devops-node-api";

export interface IRetainRun
{
	setRunRetentionLease(teamProject: string, runId: number, definitionId: number, daysValid: number, owner: string, connection: WebApi): Promise<void>
}