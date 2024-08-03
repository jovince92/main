export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    codes: Code[];
};

export interface Timestamps {    
    created_at: string;
    updated_at: string;
}

export interface Code extends Timestamps {
    id: number;
    user_id: number;
    parent_id?: number;
    head_id?: number;
    code_1?: string;
    code_2?: string;
    name: string;
    children: Code[];
    items?: Code[];
    descendants?: Code[];
}