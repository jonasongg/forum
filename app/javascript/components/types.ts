export type tPost = {
    id: number;
    type: string;
    attributes: {
        title: string;
        body: string;
        created_at: string;
        user_username: string;
        tags: {
            data: tTag;
        }[];
    };
};

export type tComment = {
    id: number;
    type: string;
    attributes: {
        body: string;
        created_at: string;
        parent_id: null | number;
        user_username: string;
        replies: {
            data: tComment;
        }[];
    };
};

export type tUser = {
    id: number;
    type: string;
    attributes: {
        username: string;
    };
};

export type tTag = {
    id: number;
    type: string;
    attributes: {
        name: string;
    };
};

export type tToken = {
    exp: number;
    user_id: number;
};
