import { useEffect, useState } from "react";

import { getAvailableUsers } from "@/shared/api/auth";
import type { AvailableUser } from "@/shared/types/user";

export const useAvailableUsers = () => {
  const [users, setUsers] = useState<AvailableUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      try {
        const response = await getAvailableUsers();
        if (mounted) {
          setUsers(response);
          setIsError(false);
        }
      } catch {
        if (mounted) {
          setUsers([]);
          setIsError(true);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchUsers();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    users,
    isLoading,
    isError,
  };
};
