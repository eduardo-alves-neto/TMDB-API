import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoading = () => {
    return (
        <div>
            <Skeleton width={500} height={300} />
        </div>
    );
};

export default SkeletonLoading;