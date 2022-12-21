export type User = {
    id: number;
    type: string;
    attributes: {
        username: string;
    };
};

export type Post = {
    id: number;
    type: string;
    attributes: {
        title: string;
        body: string;
        created_at: string;
    };
    relationships: {
        user: {
            data: {
                id: number;
                type: string;
            };
        };
    };
};
