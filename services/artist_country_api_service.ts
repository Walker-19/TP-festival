import { BASE_URL } from "../constants/config";
import type ArtistCountry from "../models/artist_country";

class ArtistCountryApiService {
	// récupérer les pays d'un artiste par son id
	public getCountriesByArtistId = async (
		id: number,
	): Promise<ArtistCountry[]> => {
		const request = new Request(
			`${BASE_URL}/artists_countries?artistId=${id}&_embed=country&_embed=artist`,
		);
		const response = await fetch(request);
		const data = await response.json();

		return data;
	};
}

export default ArtistCountryApiService;
