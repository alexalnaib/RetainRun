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
exports.RetainRun = void 0;
class RetainRun {
    setRunRetentionLease(teamProject, runId, definitionId, daysValid, owner, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const retentionLease = [];
            retentionLease.push({
                runId: runId,
                definitionId: definitionId,
                protectPipeline: true,
                daysValid: daysValid,
                ownerId: owner,
            });
            const buildApi = yield connection.getBuildApi();
            yield buildApi.addRetentionLeases(retentionLease, teamProject);
            if (daysValid === 365000) {
                console.log(`Retained pipeline run ${runId} indefinitely`);
            }
            else {
                console.log(`Retained pipeline run ${runId} for ${daysValid} days`);
            }
        });
    }
}
exports.RetainRun = RetainRun;
