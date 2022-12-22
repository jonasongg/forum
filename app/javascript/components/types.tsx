export type Post = {
    id: number;
    type: string;
    attributes: {
        title: string;
        body: string;
        created_at: string;
        user: {
            id: number;
            username: string;
            created_at: string;
            updated_at: string;
        };
    };
};
