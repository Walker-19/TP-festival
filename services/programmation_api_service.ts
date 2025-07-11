import { BASE_URL } from "../constants/config";
import type Programme from "../models/programme";

class ProgrammationApiService {
	// récupérer toute la programmation
	public getProgrammation = async (): Promise<Programme[]> => {
		// configurer la requête HTTP; par défaut requête en GET
		// sur android, le localhost est accessible à partir l'IP 10.0.2.2
		// sur ios, le localhost est accessible à partir l'IP 127.0.1.1
		const request = new Request(
			`${BASE_URL}/programme?_embed=artist&_embed=stage&_embed=day`,
		);
		const response = await fetch(request);
		const data = await response.json();

		return data;
	};

	// récupérer la programmation d'un artiste par son id
	public getProgrammationByArtistId = async (
		id: number,
	): Promise<Programme[]> => {
		const request = new Request(
			`${BASE_URL}/programme?artistId=${id}&_embed=artist&_embed=stage&_embed=day`,
		);
		const response = await fetch(request);
		const data = await response.json();

		return data;
	};
}

export default ProgrammationApiService;
