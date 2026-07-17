import { createStore, type StoredItem } from "./store";

export interface TeamMember extends StoredItem {
  name: string;
  position: string;
  bio: string;
  avatar: string;
  experience: string;
  email: string;
  phone: string;
  skills: string[];
}

// Jamoa saytda qo'shilish tartibida ko'rsatiladi
export const teamStore = createStore<TeamMember>(
  "team_members",
  {
    name: "name",
    position: "position",
    bio: "bio",
    avatar: "avatar",
    experience: "experience",
    email: "email",
    phone: "phone",
    skills: "skills",
  },
  { column: "created_at", ascending: true },
);
