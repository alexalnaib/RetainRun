import * as chai from "chai";
import * as TypeMoq from "typemoq";

import { faker } from "@faker-js/faker";
import { IVariables } from "../../helpers/taskhelper/ivariables";
import { IParameters } from "../../helpers/taskhelper/iparameters";
import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { IRunRetainer } from "../../runretainer/irunretainer";
import { RunRetainer } from "../../runretainer/runretainer";
import { NewRetentionLease } from "azure-devops-node-api/interfaces/BuildInterfaces";

describe("RunRetainer", async () => {

	const variablesMock = {
		projectName: faker.random.word(),
		buildId: faker.random.number(),
		definitionId: faker.random.number(),
		owner: `Pipeline: 'Retain Run Task'`
	} as IVariables;

	const parametersMock = {
		daysToRetain: faker.random.number(),
		variables: variablesMock
	} as IParameters;

	const retentionLeaseMock: NewRetentionLease[]= [];

	const buildApiMock = TypeMoq.Mock.ofType<IBuildApi>();

	const runRetainer: IRunRetainer = new RunRetainer(buildApiMock.object);

	it("Should create a retained lease for a run", async () => {

		//#region ARRANGE

		buildApiMock
			.setup((x) => x.addRetentionLeases(TypeMoq.It.isAny(), TypeMoq.It.isAny()))
			.returns(() => Promise.resolve(retentionLeaseMock))
			.verifiable(TypeMoq.Times.once());

		//#endregion

		//#region ACT

		const result = await runRetainer.retain(parametersMock);

		//#endregion

		//#region ASSERT

		chai.expect(runRetainer.retain).to.not.throw;
		chai.expect(result).to.not.eq(null)

		buildApiMock.verifyAll();

		//#endregion
	});
});