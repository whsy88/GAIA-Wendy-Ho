import { useEffect } from 'react';

function MyComponent() {
    useEffect(() => {
        // Side effect code here
        console.log('Effect runs');
    });

    return <div>My Component</div>;
}