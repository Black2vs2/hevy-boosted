export interface PersonalRecord {
  type: string;
  value: number;
}

export interface Set {
  id: number;
  index: number;
  indicator: string;
  weight_kg: number;
  reps: number;
  distance_meters?: any;
  duration_seconds?: any;
  rpe?: any;
  personalRecords: PersonalRecord[];
}

export interface Exercise {
  id: string;
  title: string;
  es_title: string | null;
  de_title: string | null;
  fr_title: string | null;
  it_title: string | null;
  pt_title: string | null;
  superset_id?: any;
  rest_seconds: number;
  notes: string;
  exercise_template_id: string;
  url: string;
  exercise_type: string;
  equipment_category: string;
  media_type: string;
  custom_exercise_image_url?: any;
  custom_exercise_image_thumbnail_url: string;
  thumbnail_url: string;
  muscle_group: string;
  other_muscles: string[];
  priority: number;
  sets: Set[];
}

export interface Workout {
  id: string;
  short_id: string;
  index: number;
  name: string;
  description: string;
  start_time: number;
  end_time: number;
  weight: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  routine_id: string;
  apple_watch: boolean;
  username: string;
  profile_image: string;
  verified: boolean;
  like_count: number;
  is_liked_by_user: boolean;
  like_images: any[];
  comments: any[];
  comment_count: number;
  image_urls: any[];
  exercises: Exercise[];
}
