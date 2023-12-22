export interface ProjectCustomerProps {
    id: string;
    projectId: string;
    externalId?: string;
    email: string;
    ipAddress: string[];
    logoUrl?: string;
}

export interface ProjectCustomerPropsUpdate {
    externalId: string;
    email: string;
    logoUrl: string;
}

export class ProjectCustomer {
    id: string;
    projectId: string;
    externalId?: string;
    email: string;
    ipAddress: string[];
    logoUrl?: string;

    static create(props: ProjectCustomerProps) {
        const projectCustomer = new ProjectCustomer();
        projectCustomer.id = props.id;
        projectCustomer.projectId = props.projectId;
        projectCustomer.externalId = props.externalId;
        projectCustomer.email = props.email;
        projectCustomer.ipAddress = props.ipAddress;
        projectCustomer.logoUrl = props.logoUrl;

        return projectCustomer;
    }

    update(props: ProjectCustomerPropsUpdate) {
        this.externalId = props.externalId;
        this.email = props.email;
        this.logoUrl = props.logoUrl;
    }

    addIpAddress(ipAddress: string) {
        if (!this.ipAddress.includes(ipAddress)) {
            this.ipAddress.push(ipAddress);
        }
    }
}
