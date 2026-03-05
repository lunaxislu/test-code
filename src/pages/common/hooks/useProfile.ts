import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { getCurrentUser } from "@/shared/api/auth";
import type { User } from "@/shared/types/user";

type UseProfileOptions = {
  config?: {
    enabled?: boolean;
    onSuccess?: (profile: User) => void;
  };
};

const PROFILE_QUERY_KEY = ["profile"] as const;

const useProfile = (options?: UseProfileOptions) => {
  const queryClient = useQueryClient();
  const onSuccessRef = useRef(options?.config?.onSuccess);

  useEffect(() => {
    onSuccessRef.current = options?.config?.onSuccess;
  }, [options?.config?.onSuccess]);

  const query = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getCurrentUser,
    enabled: options?.config?.enabled ?? true,
  });

  useEffect(() => {
    if (!query.isSuccess || !query.data || !onSuccessRef.current) {
      return;
    }

    onSuccessRef.current(query.data);
  }, [query.data, query.dataUpdatedAt, query.isSuccess]);

  const remove = () => {
    // 강의(v4): useQuery 결과의 remove()를 직접 사용
    // 내 프로젝트(v5): remove 제거로 queryClient.removeQueries로 동일 동작 보장
    queryClient.removeQueries({ queryKey: PROFILE_QUERY_KEY });
  };

  return {
    ...query,
    remove,
  };
};

export default useProfile;
