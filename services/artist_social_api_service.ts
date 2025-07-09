import type ArtistSocial from "../models/artist_social";

class ArtistSocialApiService {
	// récupérer les réseaux sociaux d'un artiste par son id
	public getSocialsByArtistId = async (id: number): Promise<ArtistSocial[]> => {
		const request = new Request(
			`http://10.0.2.2:3000/artists_socials?artistId=${id}&_embed=artist&_embed=social`,
		);
		const response = await fetch(request);
		const data = await response.json();

		return data;
	};
}

export default ArtistSocialApiService;
