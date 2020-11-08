import { useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const isAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.push('/login');
    }
  }, [loading, data, router]);
};
