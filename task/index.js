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
const tl = require("azure-pipelines-task-lib/task");
const taskhelper_1 = require("./helpers/taskhelper/taskhelper");
const retainrun_1 = require("./helpers/retainrun/retainrun");
const azuredevops_1 = require("./helpers/azuredevops/azuredevops");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskHelper = new taskhelper_1.TaskHelper();
        const azureDevOps = new azuredevops_1.AzureDevOps();
        const retainRun = new retainrun_1.RetainRun();
        try {
            const endpoint = yield taskHelper.getEndpoint();
            const connection = yield azureDevOps.getConnection(endpoint);
            const variables = yield taskHelper.getVariables();
            const parameters = yield taskHelper.getParameters();
            yield retainRun.setRunRetentionLease(variables.projectName, variables.buildId, variables.definitionId, parameters.daysToRetain, parameters.owner, connection);
            tl.setResult(tl.TaskResult.Succeeded, '');
        }
        catch (error) {
            tl.setResult(tl.TaskResult.Failed, error.message);
        }
    });
}
run();
