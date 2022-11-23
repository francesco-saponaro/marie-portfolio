export default {
    name: 'credentials',
    title: 'Credentials',
    type: 'document',
    fields: [
        {
            name: 'credentialsheader',
            title: 'credentials Header',
            description: 'This will be a short header about your experience',
            type: 'string',
            validation: Rule => Rule.max(100).warning('Keep this text within 100 characters')
        },
        {
            name: 'credentialssubheader',
            title: 'credentials Subheader',
            description: 'This will be a short text about your experience',
            type: 'array',
            validation: Rule => Rule.max(180).warning('Keep this text within 180 characters'),
            of: [{type: 'block'}]
        },
        {
            name: 'credentialsskills',
            title: 'credentials Skills',
            description: 'This will be a skill you possess and a description of it',
            type: 'array',
            of: [
                {
                    title: 'credentials Skill',
                    type: 'object',
                    fields: [
                                {
                                    name:'skillheader',
                                    title: 'Skill Header',
                                    type: 'string'
                                },
                                {
                                    name:'skilltext',
                                    title: 'Skill Text',
                                    type: 'array',
                                    validation: Rule => Rule.max(220).warning('Keep this text within 220 characters'),
                                    of: [{type: 'block'}]
                                }
                            ]
                }
            ],
        },
        
    ]
}