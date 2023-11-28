import { User } from './user';

export interface ProjectProps {
    id: string;
    name: string;
    publicId: string;
    userId: string;
    domainNames: string[];
}

export interface DbProps {
    id: string;
    name: string;
    publicId: string;
    userId: string;
    domainNames: string[];
}

export class Project {
    id: string;
    name: string;
    publicId: string;
    domainNames: string[] = [];
    userId: string;
    user?: User;

    static create(props: ProjectProps): Project {
        // TODO validate props
        const project = new Project();
        project.id = props.id;
        project.name = props.name;
        project.publicId = props.publicId;
        project.userId = props.userId;
        project.domainNames = props.domainNames;

        return project;
    }

    static fromDbProps(props: DbProps): Project {
        const project = new Project();

        project.id = props.id;
        project.name = props.name;
        project.publicId = props.publicId;
        project.userId = props.userId;
        project.domainNames = props.domainNames;

        return project;
    }
}
