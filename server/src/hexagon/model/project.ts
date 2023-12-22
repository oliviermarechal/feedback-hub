import { User } from './user';

export interface ProjectProps {
    id: string;
    name: string;
    apiKey: string;
    userId: string;
    domainNames: string[];
}

export interface DbProps {
    id: string;
    name: string;
    apiKey: string;
    userId: string;
    domainNames: string[];
}

export class Project {
    id: string;
    name: string;
    apiKey: string;
    domainNames: string[] = [];
    userId: string;
    user?: User;

    update(name: string, domainNames: string[] = []) {
        this.name = name;
        this.domainNames = domainNames;
    }

    static create(props: ProjectProps): Project {
        // TODO validate props
        const project = new Project();
        project.id = props.id;
        project.name = props.name;
        project.apiKey = props.apiKey;
        project.userId = props.userId;
        project.domainNames = props.domainNames;

        return project;
    }

    static fromDbProps(props: DbProps): Project {
        const project = new Project();

        project.id = props.id;
        project.name = props.name;
        project.apiKey = props.apiKey;
        project.userId = props.userId;
        project.domainNames = props.domainNames;

        return project;
    }
}
