'use client';
import { useParams } from 'next/navigation';
import withAuth from '@/components/withAuth';

const DishDetail: React.FC = () => {
  const { id } = useParams<{ tag: string; item: string }>();

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default withAuth(DishDetail);
