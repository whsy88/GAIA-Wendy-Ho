function Button() {
    const handleClick = (event) => {
        console.log('SyntheticEvent:', event);
        console.log('Native Event:', event.nativeEvent);
        console.log('Event type:', event.type);
        console.log('Target element:', event.target);
    };

return <button onClick={handleClick}>Click me</button>;
}