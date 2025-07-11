import { BASE_URL } from "../constants/config";
import Day from "../models/day";

class DayApiService {
    

    public async getDayById(dayId: number) : Promise<Day | undefined> {

        const request = new Request(
            `${BASE_URL}/days?id=${dayId}`
        )

        const response = await fetch(request);

        const data = await response.json()

        return (data as Day[]).shift();
    }
}


export default DayApiService;