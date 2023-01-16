export type tPost = {
    id: number;
    type: string;
    attributes: {
        title: string;
        body: string;
        created_at: string;
        user_username: string;
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
