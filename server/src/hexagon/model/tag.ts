export interface TagProps {
    id: string;
    label: string;
    projectId: string;
}

export interface TagDatabaseProps {
    id: string;
    label: string;
    projectId: string;
}

export class Tag {
    id: string;
    label: string;
    projectId: string;

    static create(props: TagProps): Tag {
        return Object.assign(new Tag(), { ...props });
    }

    static hydrateFromDb(dbProps: TagDatabaseProps): Tag {
        return Object.assign(new Tag(), { ...dbProps });
    }
}
