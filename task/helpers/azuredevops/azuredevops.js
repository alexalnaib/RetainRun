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
exports.AzureDevOps = void 0;
const azure_devops_node_api_1 = require("azure-devops-node-api");
class AzureDevOps {
    getConnection(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenHandler = azure_devops_node_api_1.getPersonalAccessTokenHandler(endpoint.token);
            const requestOptions = {
                socketTimeout: 10000,
                allowRetries: true,
                maxRetries: 3
            };
            const connection = new azure_devops_node_api_1.WebApi(endpoint.url, accessTokenHandler, requestOptions);
            if (!connection) {
                throw Error(`Connection cannot be made to Azure DevOps.`);
            }
            return connection;
        });
    }
}
exports.AzureDevOps = AzureDevOps;
