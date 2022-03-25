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
const retainrun_1 = require("./retainrun/retainrun");
const apifactory_1 = require("./apifactory/apifactory");
const workerfactory_1 = require("./workerfactory/workerfactory");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskHelper = new taskhelper_1.TaskHelper();
        try {
            const endpoint = yield taskHelper.getEndpoint();
            const parameters = yield taskHelper.getParameters();
            const apiFactory = new apifactory_1.ApiFactory(endpoint);
            const workerFactory = new workerfactory_1.WorkerFactory(apiFactory);
            const runRetainer = yield workerFactory.createRunRetainer();
            const retainRun = new retainrun_1.RetainRun(runRetainer);
            yield retainRun.setRunRetentionLease(parameters);
            tl.setResult(tl.TaskResult.Succeeded, '');
        }
        catch (error) {
            tl.setResult(tl.TaskResult.Failed, error.message);
        }
    });
}
run();
