// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Workout } from "../../types/hevy";

export type workoutsApiResponse = {
  workouts: Workout[];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<workoutsApiResponse>
) {
  const workouts = await axios.get<workoutsApiResponse>(
    "https://api.hevyapp.com/feed_workouts_paged",
    {
      headers: {
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "x-api-key": "shelobs_hevy_web",
        "auth-token": process.env.HEVY_TOKEN || "",
      },
    }
  );
  res.status(200).send(workouts.data);
}
