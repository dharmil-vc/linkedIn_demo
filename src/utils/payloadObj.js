export const payload = (
    id,
    category,
    text,
    title,
    description,
    mediaUrl,
    asset
) => {
    const textObj = {
        author: `urn:li:person:${id}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: `${text}`,
                },
                shareMediaCategory: `${category}`,
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
    };

    const articleObj = {
        author: `urn:li:person:${id}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: `${text}`,
                },
                shareMediaCategory: 'ARTICLE',
                media: [
                    {
                        status: 'READY',
                        description: {
                            text: `${description}`,
                        },
                        originalUrl: `${mediaUrl}`,
                        title: {
                            text: `${title}`,
                        },
                    },
                ],
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
    };
    const registerImageObj = {
        registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: `urn:li:person:${id}`,
            serviceRelationships: [
                {
                    relationshipType: 'OWNER',
                    identifier: 'urn:li:userGeneratedContent',
                },
            ],
        },
    };
    const imageObj = {
        author: `urn:li:person:${id}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: `${text}`,
                },
                shareMediaCategory: 'IMAGE',
                media: [
                    {
                        status: 'READY',
                        description: {
                            text: `${description}`,
                        },
                        media: `${asset}`,
                        title: {
                            text: `${title}`,
                        },
                    },
                ],
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
    };

    switch (category) {
        case 'NONE':
            return textObj;
        case 'ARTICLE':
            return articleObj;
        case 'IMAGE':
            return [registerImageObj, imageObj];
    }
};
