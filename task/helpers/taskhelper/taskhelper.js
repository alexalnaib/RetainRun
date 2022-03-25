"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskHelper = void 0;
const task_1 = require("azure-pipelines-task-lib/task");
class TaskHelper {
    getEndpoint() {
        return __awaiter(this, void 0, void 0, function* () {
            // Use upper-case default system endpoint name
            // For compatibility with non-Windows systems
            let endpointName = "SYSTEMVSSCONNECTION";
            let token = "AccessToken";
            let endpointUrl = task_1.getEndpointUrl(endpointName, true);
            if (!endpointUrl) {
                throw new Error(`Unable to get <${endpointName}> endpoint URL`);
            }
            const endpointToken = task_1.getEndpointAuthorizationParameter(endpointName, token, true);
            if (!endpointToken) {
                throw new Error(`Unable to get <${endpointName}> (${token}) endpoint token`);
            }
            const endpoint = {
                url: endpointUrl,
                token: endpointToken,
            };
            return endpoint;
        });
    }
    getVariables() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectName = task_1.getVariable("System.TeamProject");
            const buildId = task_1.getVariable("Build.BuildId");
            const definitionId = task_1.getVariable("System.DefinitionId");
            const owner = `Pipeline: 'Retain Run Task'`;
            if (projectName === undefined) {
                throw Error(`Input ${projectName} project name is empty`);
            }
            if (buildId === undefined) {
                throw Error(`Input ${buildId} build ID is empty`);
            }
            if (definitionId === undefined) {
                throw Error(`Input ${definitionId} definition ID is empty`);
            }
            const variables = {
                projectName: projectName ? projectName : "Unknown",
                buildId: Number(buildId) ? Number(buildId) : 0,
                definitionId: Number(definitionId) ? Number(definitionId) : 0,
                owner: owner
            };
            return variables;
        });
    }
    getParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            const daysToRetain = task_1.getInput("days", true);
            let daysValid = 0;
            if (daysToRetain === undefined) {
                throw Error(`Input ${daysToRetain} is empty`);
            }
            const variables = yield this.getVariables();
            let parameters = {
                daysToRetain: Number(daysToRetain),
                variables
            };
            if (parameters.daysToRetain === 0) {
                daysValid = 365000;
            }
            else {
                daysValid = parameters.daysToRetain;
            }
            parameters.daysToRetain = daysValid;
            return parameters;
        });
    }
}
exports.TaskHelper = TaskHelper;
