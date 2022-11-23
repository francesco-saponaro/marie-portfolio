export default {
    name: 'socials',
    title: 'Socials',
    type: 'document',
    fields: [
    
                {
                    name: 'fileboolean',
                    title: 'Do yoy want to upload your CV?',
                    description: 'Tick this box if you would like to upload a CV rather than adding a URL link',
                    type: 'boolean'
                },
                {
                    name: 'socialname',
                    title: 'Social name',
                    type: 'string'
                },
                {
                    name: 'socialurl',
                    title: 'Social URL',
                    type: 'url',
                    validation: Rule => Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel']
                    }),
                    hidden: ({parent}) => parent?.fileboolean
                },
                {
                    title: 'File Upload',
                    name: 'fileupload',
                    description: 'Upload your CV',
                    type: 'file',
                    fields: [
                        {
                        name: 'description',
                        type: 'string',
                        title: 'Description'
                        }
                    ],
                    hidden: ({parent}) => !parent?.fileboolean
                }
            ]
}