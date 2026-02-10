export const formatDate = (isoDate: string | Date, format = null): string => {
    const date = new Date(isoDate);
    const formattedDateTime = date.toLocaleString('en-GB', {
        timeZone: 'Africa/Kigali',
    });

    return formattedDateTime;
};
