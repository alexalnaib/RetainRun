import * as chai from "chai";
import { ImportMock } from "ts-mock-imports";

import * as TaskLibrary from "azure-pipelines-task-lib/task";

import { ITaskHelper } from "../../helpers/taskhelper/itaskhelper";
import { TaskHelper } from "../../helpers/taskhelper/taskhelper";

describe("TaskHelper", async () =>{

	const taskHelper: ITaskHelper = new TaskHelper();

	const endpointUrlMock: string = `https://dev.azure.com/My-Organization`;
	const endpointTokenMock: string = "My-Token";

	const projectNameMock: string = "My-Project";
	const buildIdMock: string = "1";
	const definitionIdMock: string = "2";
	const ownerMock: string = "Pipeline: 'Retain Run Task'"

	const daysToRetainMock: string = "0"

	let inputs: {[key: string]: string | boolean};
	let variables: {[key: string]: string};

	beforeEach(async () => {

		const getInputMock = ImportMock.mockFunction(TaskLibrary, "getInput");
		getInputMock.callsFake((i: string | number) => { return inputs[i] || null; });

		const getVariableMock = ImportMock.mockFunction(TaskLibrary, "getVariable");
		getVariableMock.callsFake((i: string | number) => { return variables[i] || null; });

		inputs = {};
		variables = {};

	});

	afterEach(async () => {

		ImportMock.restore();

	});

	it("Should return an endpoint", async () => {

		//#region Arrange

		const getEndpointUrlMock = ImportMock.mockFunction(TaskLibrary, "getEndpointUrl");
		getEndpointUrlMock.callsFake(() => endpointUrlMock);

		const getEndpointAuthorizationParameterMock = ImportMock.mockFunction(TaskLibrary, "getEndpointAuthorizationParameter");
		getEndpointAuthorizationParameterMock.callsFake(() => endpointTokenMock);


		//#end region

		//#region ACT

		const result = await taskHelper.getEndpoint();

		//#end region

		//#region ASSERT

		chai.expect(taskHelper.getEndpoint).to.not.throw;
		chai.expect(result).to.not.eq(null);
		chai.expect(result.url).to.eq(endpointUrlMock);
		chai.expect(result.token).to.eq(endpointTokenMock)

		//#end region
	});

	it("Should return variables", async () => {

		//#region Arrange

		variables["System.TeamProject"] = projectNameMock;
		variables["Build.BuildId"] = buildIdMock;
		variables["System.DefinitionId"] = definitionIdMock;

		//#end region

		//#region ACT

		const result = await taskHelper.getVariables();

		//#end region

		//#region ASSERT

		chai.expect(taskHelper.getVariables).to.not.throw;
		chai.expect(result).to.not.eq(null);

		chai.expect(result.projectName).to.eq(projectNameMock);
		chai.expect(result.buildId).to.eq(1);
		chai.expect(result.definitionId).to.eq(2);
		chai.expect(result.owner).to.eq(ownerMock);

		//#end region
	});

	it("Should return parameters", async () => {

		//#region Arrange

		inputs["days"] = daysToRetainMock;

		//#end region

		//#region ACT

		const result = await taskHelper.getParameters();

		//#end region

		//#region ASSERT

		chai.expect(taskHelper.getParameters).to.not.throw;
		chai.expect(result).to.not.eq(null);

		chai.expect(result.daysToRetain).to.eq(365000);

		//#end region
	});
});