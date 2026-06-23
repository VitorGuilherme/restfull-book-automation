export const contactInvalidScenarios = [
    { field: 'firstname', value: '', errors: ['Name may not be blank'] },
    { field: 'email', value: '', errors: ['Email may not be blank'] },
    { field: 'phone', value: '', errors: ['Phone may not be blank'] },
    { field: 'phone', value: '123', errors: ['Phone must be between 11 and 21 characters.'] },
    { field: 'subject', value: '', errors: ['Subject may not be blank', 'Subject must be between 5 and 100 characters.'] },
    { field: 'subject', value: 'abc', errors: ['Subject must be between 5 and 100 characters.'] },
    { field: 'message', value: '', errors: ['Message may not be blank', 'Message must be between 20 and 2000 characters.'] }
];

export const bookingInvalidScenarios = [
    { field: 'firstname', value: '', errors: ['Firstname should not be blank'] },
    { field: 'firstname', value: 'ab', errors: ['size must be between 3 and 18'] },
    { field: 'lastname', value: '', errors: ['Lastname should not be blank'] },
    { field: 'lastname', value: 'ab', errors: ['size must be between 3 and 30'] },
    { field: 'email', value: '', errors: ['must not be empty'] },
    { field: 'phone', value: '', errors: ['must not be empty'] },
    { field: 'phone', value: '123', errors: ['size must be between 11 and 21'] }
];