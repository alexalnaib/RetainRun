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
const azure_devops_node_api_1 = require("azure-devops-node-api");
const azuredevops_1 = require("../../helpers/azuredevops/azuredevops");
describe("AzureDevops", () => __awaiter(void 0, void 0, void 0, function* () {
    const endpointMock = {
        url: `https://my.project.uri`,
        token: `My-Secret-Token`
    };
    const requestOptionsMock = {
        socketTimeout: 10000,
        allowRetries: true,
        maxRetries: 3
    };
    const azureDevOps = new azuredevops_1.AzureDevOps();
    it("Should return a connection", () => __awaiter(void 0, void 0, void 0, function* () {
        //#region Arrange
        const accessTokenMock = azure_devops_node_api_1.getPersonalAccessTokenHandler(endpointMock.token);
        const connectionMock = new azure_devops_node_api_1.WebApi(endpointMock.url, accessTokenMock, requestOptionsMock);
        //#end region
        //#region ACT
        const result = yield azureDevOps.getConnection(endpointMock);
        //#end region
        //#region ASSERT
        chai.expect(azureDevOps.getConnection).to.not.throw;
        chai.expect(result).to.not.eq(null);
        chai.expect(result.authHandler.canHandleAuthentication).to.eq(connectionMock.authHandler.canHandleAuthentication);
        //#end region
    }));
}));
