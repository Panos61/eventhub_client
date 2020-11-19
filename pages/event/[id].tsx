import React from 'react';
import { useRouter } from 'next/router';
import { useEventQuery } from '../../src/generated/graphql';

const Event: React.FC = () => {
  const router = useRouter();

  const { data, error, loading } = useEventQuery({
    variables: {
      id: typeof router.query.id === 'string' ? parseInt(router.query.id) : -1,
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      {data?.event?.title} <br />
      {data?.event?.description}
    </div>
  );
};

export default Event;
