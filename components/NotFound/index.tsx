import './index.scss';
import { OctagonAlert } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="title">
        <OctagonAlert />
        <h1>Oops! The table not found!</h1>
      </div>
      <p>Please connect with the restaurant</p>
    </div>
  );
};
