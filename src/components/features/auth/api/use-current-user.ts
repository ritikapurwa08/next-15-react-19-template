import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export default function UseCurrentUser() {
  const currentUser = useQuery(api.users.getCurrentUser);

  const isLoading = currentUser === undefined;

  return {
    currentUser,
    isLoading,
  };
}
