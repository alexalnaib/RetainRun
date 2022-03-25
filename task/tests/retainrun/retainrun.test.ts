import * as chai from "chai";
import * as TypeMoq from "typemoq";

import { faker } from "@faker-js/faker";

import { IParameters } from "../../helpers/taskhelper/iparameters";
import { IVariables } from "../../helpers/taskhelper/ivariables";
import { IRunRetainer } from "../../runretainer/irunretainer";
import { RetainRun } from "../../retainrun/retainrun";
import { IRetainRun } from "../../retainrun/iretainrun";

describe("RetainRun", async () => {

	const runRetainerMock = TypeMoq.Mock.ofType<IRunRetainer>();

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

	const retainRun: IRetainRun = new RetainRun(runRetainerMock.object);

	it("Should retain a run", async () => {

		//#region ARRANGE

		runRetainerMock
			.setup((x) => x.retain(parametersMock))
			.returns(() => Promise.resolve())
			.verifiable(TypeMoq.Times.once());

		//#endregion

		//#region ACT

		const result = await retainRun.setRunRetentionLease(parametersMock);

		//#endregion

		//#region ASSERT

		chai.expect(retainRun.setRunRetentionLease).to.not.throw;
		chai.expect(result).to.not.eq(null)

		runRetainerMock.verifyAll();
	});
});