export default {
    name: 'projectpagehero',
    title: 'Project Page Hero',
    type: 'document',
    fields: [
        {
            name: 'projectpagedate',
            title: 'Project Page Date',
            type: 'string'
        },
        {
            name: 'projectpagetitle',
            title: 'Project Page Title',
            type: 'string'
        },
        {
            name: 'projectpageurl',
            title: 'Project Page URL',
            type: 'url',
            validation: Rule => Rule.uri({
                scheme: ['http', 'https']
              })
        },
        {
            name: 'projectpageimage',
            type: 'figure'
        },
        {
            name: 'projectpagedescription',
            title: 'Project Page Description',
            description: 'This will be the short description text displayed on the main page projects section',
            validation: Rule => Rule.max(300).warning('Keep this short description within 300 characters'),
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'projectpagerolelist',
            title: 'Project Page Role List',
            description: 'Bullet list listing your roles in the project',
            type: 'array',
            of: [{type: 'string'}],
            validation: Rule => Rule.max(30).warning('Keep this text within 30 characters')
        },
        {
            name: 'projectpagetypelist',
            title: 'Project Page Type List',
            description: 'Bullet list listing what type of business the project was commissioned for',
            type: 'array',
            of: [{type: 'string'}],
            validation: Rule => Rule.max(30).warning('Keep this text within 30 characters')
        },
        {
            name: 'projectpagegoalslist',
            title: 'Project Page Goals List',
            description: 'Bullet list listing your goals for the project',
            type: 'array',
            of: [{type: 'string'}],
            validation: Rule => Rule.max(60).warning('Keep this text within 60 characters')
        },
        {
            name: 'projectpagedeliverableslist',
            title: 'Project Page Deliverables List',
            description: 'Bullet list listing your deliverables for the project',
            type: 'array',
            of: [{type: 'string'}],
            validation: Rule => Rule.max(30).warning('Keep this text within 30 characters')
        },
        {
            name: 'projectpageblocks',
            title: 'Project Page Blocks',
            description: 'This will be the blocks describing the project process',
            type: 'array',
            of: [
                {
                    title: 'Project Page Block',
                    type: 'object',
                    fields: [
                        {
                            name: 'imagesblockboolean',
                            title: 'Is this block a purely images block?',
                            description: 'Tick this box if you would like the block to be just images with some text below instead of one image and text',
                            type: 'boolean'
                        },
                        {
                            name: 'imagesleftsideboolean',
                            title: 'Do you want the images on the left side?',
                            description: 'Tick this box if you would like the block to have image on the left and text on the right',
                            type: 'boolean',
                            hidden: ({parent}) => parent?.imagesblockboolean
                        },
                        {
                            name: 'projectpageblockimage',
                            type: 'figure',
                            hidden: ({parent}) => parent?.imagesblockboolean
                        },
                        {
                            name: 'projectpageblockdescription',
                            title: 'Project Page Block Description',
                            description: 'This will be the short description text',
                            type: 'array',
                            of: [
                                {
                                    title: 'Block Description',
                                    type: 'object',
                                    fields: [
                                                {
                                                    name:'descriptionheader',
                                                    title: 'Description Header',
                                                    type: 'string',
                                                    validation: Rule => Rule.max(60).warning('Description title word shouldnt be longer than 40 characters')
                                                },
                                                {
                                                    name:'descriptiontext',
                                                    title: 'Description Text',
                                                    type: 'array',
                                                    of: [{type: 'block'}]
                                                },
                                            ]
                                }
                            ],
                            hidden: ({parent}) => parent?.imagesblockboolean
                        },
                        {
                            name: 'projectpageblockfirstimage',
                            title: 'Project Page Block First Image',
                            description: 'This will be the first block image with some text below it',
                            type: 'object',
                            fields: [
                                        {
                                            name: 'firstimage',
                                            type: 'figure',
                                        },
                                        {
                                            name:'firstimagetext',
                                            title: 'First Image Text',
                                            type: 'array',
                                            of: [{type: 'block'}]
                                        },
                                    ],
                            hidden: ({parent}) => !parent?.imagesblockboolean
                        },
                        {
                            name: 'projectpageblocksecondimage',
                            title: 'Project Page Block Second Image',
                            description: 'This will be the second block image with some text below it',
                            type: 'object',
                            fields: [
                                        {
                                            name: 'secondimage',
                                            type: 'figure',
                                        },
                                        {
                                            name:'secondimagetext',
                                            title: 'Second Image Text',
                                            type: 'array',
                                            of: [{type: 'block'}]
                                        },
                                    ],
                            hidden: ({parent}) => !parent?.imagesblockboolean
                        }
                    ]
                }
            ],
        },
    ]
}