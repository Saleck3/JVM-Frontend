import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
    return (
        <div
            className={cn(
                'rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Card.displayName = 'Card';

export { Card };