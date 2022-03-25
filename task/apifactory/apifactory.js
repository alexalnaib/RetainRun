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
exports.ApiFactory = void 0;
const azure_devops_node_api_1 = require("azure-devops-node-api");
class ApiFactory {
    constructor(endpoint) {
        const requestOptions = {
            socketTimeout: 10000,
            allowRetries: true,
            maxRetries: 3
        };
        const auth = azure_devops_node_api_1.getPersonalAccessTokenHandler(endpoint.token);
        this.webApi = new azure_devops_node_api_1.WebApi(endpoint.url, auth, requestOptions);
    }
    createBuildApi() {
        return __awaiter(this, void 0, void 0, function* () {
            const buildApi = yield this.webApi.getBuildApi();
            return buildApi;
        });
    }
}
exports.ApiFactory = ApiFactory;
