import { BASE_URL } from "../constants/config";
import type Artist from "../models/artist";

class ArtistApiService {
	// récupérer un artiste par son slug
	public getArtistBySlug = async (
		slug: string,
	): Promise<Artist | undefined> => {
		const request = new Request(
			`${BASE_URL}/artists?slug=${slug}&_embed=music_type`,
		);
		const response = await fetch(request);
		const data = await response.json();

		return (data as Artist[]).shift();
	};

	public async getArtistById(artistId: number) : Promise<Artist | undefined> {
		const request = new Request(
			`${BASE_URL}/artists?id=${artistId}`
		);

		const response = await fetch(request);

		const data = await response.json();

		return (data as Artist[]).shift();
	}
}

export default ArtistApiService;
