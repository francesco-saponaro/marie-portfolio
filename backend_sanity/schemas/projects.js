export default {
    name: 'projects',
    title: 'Projects',
    type: 'document',
    fields: [
        {
            name: 'projectdate',
            title: 'Project Date',
            type: 'string'
        },
        {
            name: 'projecttitle',
            title: 'Project Title',
            type: 'string'
        },
        {
            name: 'projectdescription',
            title: 'Project Description',
            description: 'This will be the short description text displayed on the main page projects section',
            validation: Rule => Rule.max(200).warning('Keep this short description within 200 characters'),
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'projectimage',
            type: 'figure'
        },
        {
            name: 'projectpage',
            title: 'Project Page',
            type: 'reference',
            to: [{type: 'projectpagehero'}]
        },
    ]
}