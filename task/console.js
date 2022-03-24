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
const retainrun_1 = require("./helpers/retainrun/retainrun");
const azuredevops_1 = require("./helpers/azuredevops/azuredevops");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = {
            url: "https://dev.azure.com/iag/",
            token: "p5zj7lvatanu4buhf3wz3gbvtqjon43anti5unvca3d6yzoddpfq"
        };
        const variables = {
            projectName: "Digital.HelloYo.App",
            buildId: 186759,
            definitionId: 1525
        };
        const parameters = {
            owner: "Pipeline: 'Retain Run Task'",
            daysToRetain: 5
        };
        const azureDevOps = new azuredevops_1.AzureDevOps();
        const retainRun = new retainrun_1.RetainRun();
        const connection = yield azureDevOps.getConnection(endpoint);
        yield retainRun.setRunRetentionLease(variables.projectName, variables.buildId, variables.definitionId, parameters.daysToRetain, parameters.owner, connection);
    });
}
run();
