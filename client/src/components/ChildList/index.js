import React from 'react';
import { Link } from 'react-router-dom';

const ChildList = ({ childCount, username, children }) => {
  if (!children || !children.length) {
    return <p className="bg-dark text-secondary p-3">{username}, add your children!</p>;
  }

  return (
    <div>
      <h2>
        {username}'s {childCount} {childCount === 1 ? 'child' : 'children'}
      </h2>
      {children.map(child => (
        <button className="btn w-100 display-block mb-2" key={child._id}>
          <Link to={`/profile/${child.username}`}>{child.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default ChildList;