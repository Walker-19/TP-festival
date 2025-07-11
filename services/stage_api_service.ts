/* stage_api_services.ts */

import { BASE_URL } from "../constants/config";
import type Stage from "../models/stage";
import type StageType from "../models/stage_type";

class StageApiService {
	public async getTypeStage(): Promise<StageType[]> {
		const request = new Request(`${BASE_URL}/stage_types`);
		const response = await fetch(request);

		const data = await response.json();

		return data;
	}

	public async getStageByType(idType: number): Promise<Stage[]> {
		const request = new Request(`${BASE_URL}/stages?stage_typeId=${idType}`);
		const response = await fetch(request);

		const data = await response.json();
		return data;
	}
}

export default StageApiService;
