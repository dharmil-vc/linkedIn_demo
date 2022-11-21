export const payload = (data) => {
    const textObj = {
        author: `urn:li:person:${data.authorId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: `${data.text}`,
                },
                shareMediaCategory: `${data.shareMediaCategory}`,
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
    };

    const articleObj = {
        author: `urn:li:person:${data.authorId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: `${data.text}`,
                },
                shareMediaCategory: 'ARTICLE',
                media: [
                    {
                        status: 'READY',
                        description: {
                            text: `${data.mediaDescription}`,
                        },
                        originalUrl: `${data.mediaUrl}`,
                        title: {
                            text: `${data.mediaTitle}`,
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
            owner: `urn:li:person:${data.authorId}`,
            serviceRelationships: [
                {
                    relationshipType: 'OWNER',
                    identifier: 'urn:li:userGeneratedContent',
                },
            ],
        },
    };
    const imageObj = {
        author: `urn:li:person:${data.authorId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: `${data.text}`,
                },
                shareMediaCategory: 'IMAGE',
                media: [
                    {
                        status: 'READY',
                        description: {
                            text: `${data.mediaDescription}`,
                        },
                        media: `${data.asset}`,
                        title: {
                            text: `${data.mediaTitle}`,
                        },
                    },
                ],
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
    };
    switch (data.shareMediaCategory) {
        case 'NONE':
            return textObj;
        case 'ARTICLE':
            return articleObj;
        case 'IMAGE':
            return [registerImageObj, imageObj];
    }
};
