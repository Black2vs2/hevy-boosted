import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

import { Workout } from "../types/hevy";

import fake_data from "./fake_data";

const Workout = ({ workout }: { workout: Workout }) => {
  return (
    <div className="border-2 rounded-lg my-4 p-3">
      <div className="border-b-2 flex flex-row">
        <div className="basis-1/12 mx-2">
          <Image
            src={workout.profile_image}
            width="60px"
            height="60px"
            alt="Profile Image"
            className="m-2"
          />
        </div>
        <div className="basis-11/12">
          <div>{workout.username}</div>
          <div className="font-thin opacity-60">
            {dayjs(workout.created_at).format("D[ ]MMM[ ]YYYY[, ]HH:MM")}
          </div>
        </div>
      </div>
      <div className="border-b-2">Workout</div>
      <div className="border-b-2">Actions</div>
      <div className="border-b-2">Comment</div>
    </div>
  );
};

const Workouts = () => {
  return (
    <div className="m-4">
      {fake_data.workouts.map((workout) => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default Workouts;
