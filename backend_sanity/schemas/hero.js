export default {
    name: 'hero',
    title: 'Hero',
    type: 'document',
    fields: [
        {
            name: 'heroheaders',
            title: 'Hero Headers',
            description: 'This will be the two headers in the hero section, each header will have two strings',
            type: 'array',
            of: [
                {
                    title: 'Hero Header',
                    type: 'object',
                    fields: [
                                {
                                    name:'firststring',
                                    title: 'First String',
                                    type: 'string',
                                    validation: Rule => Rule.max(12).warning('A single title word shouldnt be longer than 12 characters')
                                },
                                {
                                    name:'secondstring',
                                    title: 'Second String',
                                    type: 'string',
                                    validation: Rule => Rule.max(12).warning('A single title word shouldnt be longer than 12 characters')
                                },
                            ]
                }
            ],
        },
        {
            name: 'herobio',
            title: 'Hero Bio',
            description: 'This will be a short text about you',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'heroimage',
            type: 'figure'
        }
    ]
}