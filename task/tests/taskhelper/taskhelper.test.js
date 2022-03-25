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
const ts_mock_imports_1 = require("ts-mock-imports");
const TaskLibrary = __importStar(require("azure-pipelines-task-lib/task"));
const taskhelper_1 = require("../../helpers/taskhelper/taskhelper");
describe("TaskHelper", () => __awaiter(void 0, void 0, void 0, function* () {
    const taskHelper = new taskhelper_1.TaskHelper();
    const endpointUrlMock = `https://dev.azure.com/My-Organization`;
    const endpointTokenMock = "My-Token";
    const projectNameMock = "My-Project";
    const buildIdMock = "1";
    const definitionIdMock = "2";
    const ownerMock = "Pipeline: 'Retain Run Task'";
    const daysToRetainMock = "0";
    let inputs;
    let variables;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const getInputMock = ts_mock_imports_1.ImportMock.mockFunction(TaskLibrary, "getInput");
        getInputMock.callsFake((i) => { return inputs[i] || null; });
        const getVariableMock = ts_mock_imports_1.ImportMock.mockFunction(TaskLibrary, "getVariable");
        getVariableMock.callsFake((i) => { return variables[i] || null; });
        inputs = {};
        variables = {};
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        ts_mock_imports_1.ImportMock.restore();
    }));
    it("Should return an endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        //#region Arrange
        const getEndpointUrlMock = ts_mock_imports_1.ImportMock.mockFunction(TaskLibrary, "getEndpointUrl");
        getEndpointUrlMock.callsFake(() => endpointUrlMock);
        const getEndpointAuthorizationParameterMock = ts_mock_imports_1.ImportMock.mockFunction(TaskLibrary, "getEndpointAuthorizationParameter");
        getEndpointAuthorizationParameterMock.callsFake(() => endpointTokenMock);
        //#end region
        //#region ACT
        const result = yield taskHelper.getEndpoint();
        //#end region
        //#region ASSERT
        chai.expect(taskHelper.getEndpoint).to.not.throw;
        chai.expect(result).to.not.eq(null);
        chai.expect(result.url).to.eq(endpointUrlMock);
        chai.expect(result.token).to.eq(endpointTokenMock);
        //#end region
    }));
    it("Should return variables", () => __awaiter(void 0, void 0, void 0, function* () {
        //#region Arrange
        variables["System.TeamProject"] = projectNameMock;
        variables["Build.BuildId"] = buildIdMock;
        variables["System.DefinitionId"] = definitionIdMock;
        //#end region
        //#region ACT
        const result = yield taskHelper.getVariables();
        //#end region
        //#region ASSERT
        chai.expect(taskHelper.getVariables).to.not.throw;
        chai.expect(result).to.not.eq(null);
        chai.expect(result.projectName).to.eq(projectNameMock);
        chai.expect(result.buildId).to.eq(1);
        chai.expect(result.definitionId).to.eq(2);
        chai.expect(result.owner).to.eq(ownerMock);
        //#end region
    }));
    it("Should return parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        //#region Arrange
        inputs["days"] = daysToRetainMock;
        //#end region
        //#region ACT
        const result = yield taskHelper.getParameters();
        //#end region
        //#region ASSERT
        chai.expect(taskHelper.getParameters).to.not.throw;
        chai.expect(result).to.not.eq(null);
        chai.expect(result.daysToRetain).to.eq(365000);
        //#end region
    }));
}));
