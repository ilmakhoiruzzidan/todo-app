export default function getDateUtil() {
    const event = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return (event.toLocaleDateString('en-ID', options));
}

