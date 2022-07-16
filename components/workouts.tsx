import Image from "next/image";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import { Workout } from "../types/hevy";

import { ThumbUpIcon, ChatIcon, LinkIcon } from "@heroicons/react/outline";

import fake_data from "./fake_data";
import { workoutsApiResponse } from "../pages/api/workoutPages";
import { CircularProgress } from "@mui/material";

const Header = ({ workout }: { workout: Workout }) => {
  const {
    profile_image,
    username,
    created_at,
    name,
    exercises,
    start_time,
    end_time,
  } = workout;
  const workoutDuration = dayjs.duration({ seconds: end_time - start_time });

  return (
    <>
      <div className="flex flex-row">
        <div className="mx-2">
          <Image
            src={profile_image}
            width="50px"
            height="50px"
            alt="Profile Image"
            className="m-2"
          />
        </div>
        <div className="basis-8/12">
          <div>{username}</div>
          <div className=" opacity-70">
            {dayjs(created_at).format("D MMM YYYY, HH:MM")}
          </div>
        </div>
      </div>
      <div className="basis 12/12 font-bold text-2xl mt-3">{name}</div>
      <div className="flex flex-row my-3">
        <div className="mr-4">
          <div className="opacity-70">Duration</div>
          <div>{`${Math.floor(workoutDuration.asHours())}h ${Math.floor(
            workoutDuration.asMinutes() % 60
          )}m`}</div>
        </div>
        <div>
          <div className="opacity-70">Volume</div>
          <div>
            {Math.floor(
              exercises.reduce(
                (accumulator, exercise) =>
                  exercise.sets.reduce(
                    (accumulator1, set) =>
                      set.reps * set.weight_kg + accumulator1,
                    0
                  ) + accumulator,
                0
              )
            )}
            kg
          </div>
        </div>
      </div>
    </>
  );
};

const Exercises = ({ workout }: { workout: Workout }) => {
  const { exercises } = workout;
  const exercisesSliced = exercises.slice(0, 3);
  const remainingElements = exercises.length - exercisesSliced.length;
  return (
    <>
      <div className="opacity-70 text-xl">Workout</div>
      {exercisesSliced.map((exercise) => (
        <div key={exercise.id} className="flex items-center m-2">
          <div className="mr-4">
            <Image
              src={exercise.thumbnail_url}
              width="50px"
              height="50px"
              alt="Profile Image"
              className="m-2"
            />
          </div>
          <div>
            {exercise.sets.length} Sets - {exercise.title}
          </div>
        </div>
      ))}
      {remainingElements >= 0 ? (
        <div className="text-center opacity-60 text-lg">
          See {remainingElements} more exercises
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const Social = ({ workout }: { workout: Workout }) => {
  return (
    <div className="flex flex-row">
      <div className="basis-6/12 opacity-40 text-xs text-left">
        {workout.like_count} likes
      </div>
      <div className="basis-6/12 opacity-40 text-xs text-right">
        {workout.comments.length} comments
      </div>
    </div>
  );
};

const Actions = ({ workout }: { workout: Workout }) => {
  const actionsArray = [
    { ImageComponent: ThumbUpIcon },
    { ImageComponent: ChatIcon },
    { ImageComponent: LinkIcon },
  ];
  return (
    <div className="flex flex-row justify-center border-y-2">
      {actionsArray.map(({ ImageComponent }, index) => (
        <div
          key={index}
          className="basis-4/12 flex justify-center my-4 px-4 border-x"
        >
          <ImageComponent width="33px" height="33px" />
        </div>
      ))}
    </div>
  );
};

const Comment = ({ workout }: { workout: Workout }) => {
  return (
    <div className="flex flex-row m-2">
      <div className="mr-4">
        <Image
          src={workout.profile_image}
          width="45px"
          height="45px"
          alt="Profile Image"
        />
      </div>
      <div className="border-2 rounded-md w-full bg-zinc-100 flex items-center">
        <input
          type="text"
          placeholder="Write a comment..."
          className="bg-transparent mx-2 focus:outline-none w-full"
        ></input>
      </div>
    </div>
  );
};

const Workout = ({ workout }: { workout: Workout }) => {
  // console.log(workout);
  return (
    <div className="border-2 rounded-lg my-4 p-3 grid grid-cols-12 gap-3">
      <div className="border-b-2 col-span-12">
        <Header workout={workout} />
      </div>
      <div className="col-span-12">
        <Exercises workout={workout} />
      </div>
      <div className="col-span-12">
        <Social workout={workout} />
      </div>
      <div className="col-span-12">
        <Actions workout={workout} />
      </div>
      <div className="col-span-12">
        <Comment workout={workout} />
      </div>
    </div>
  );
};

const Workouts = () => {
  const [workouts, setWorkouts] = useState<workoutsApiResponse>({
    workouts: [],
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/workoutPages")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="m-4">
      {isLoading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        workouts.workouts.map((workout) => (
          <Workout key={workout.id} workout={workout} />
        ))
      )}
    </div>
  );
};

export default Workouts;
