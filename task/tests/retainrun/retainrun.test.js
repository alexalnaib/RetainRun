"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai = __importStar(require("chai"));
const TypeMoq = __importStar(require("typemoq"));
const faker_1 = require("@faker-js/faker");
const retainrun_1 = require("../../retainrun/retainrun");
describe("RetainRun", () => __awaiter(void 0, void 0, void 0, function* () {
    const runRetainerMock = TypeMoq.Mock.ofType();
    const variablesMock = {
        projectName: faker_1.faker.random.word(),
        buildId: faker_1.faker.random.number(),
        definitionId: faker_1.faker.random.number(),
        owner: `Pipeline: 'Retain Run Task'`
    };
    const parametersMock = {
        daysToRetain: faker_1.faker.random.number(),
        variables: variablesMock
    };
    const retainRun = new retainrun_1.RetainRun(runRetainerMock.object);
    it("Should retain a run", () => __awaiter(void 0, void 0, void 0, function* () {
        //#region ARRANGE
        runRetainerMock
            .setup((x) => x.retain(parametersMock))
            .returns(() => Promise.resolve())
            .verifiable(TypeMoq.Times.once());
        //#endregion
        //#region ACT
        const result = yield retainRun.setRunRetentionLease(parametersMock);
        //#endregion
        //#region ASSERT
        chai.expect(retainRun.setRunRetentionLease).to.not.throw;
        chai.expect(result).to.not.eq(null);
        runRetainerMock.verifyAll();
    }));
}));
