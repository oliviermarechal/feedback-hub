CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email VARCHAR ( 100 ) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE projects (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    api_key VARCHAR ( 32 ) NOT NULL,
    name VARCHAR ( 50 ) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id uuid NOT NULL,
    domain_names text[] DEFAULT ARRAY[]::text[],
    PRIMARY KEY(id),
    CONSTRAINT fk_project_user
        FOREIGN KEY (user_id)
            REFERENCES users(id)
);

CREATE TABLE feedbacks (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    type VARCHAR ( 50 ) NOT NULL,
    project_id uuid NOT NULL,
    author_id uuid NOT NULL,
    url TEXT NULL,
    os VARCHAR ( 50 ) NULL,
    engine VARCHAR ( 50 ) NULL,
    language VARCHAR ( 50 ) NULL,
    browser VARCHAR ( 50 ) NULL,
    status VARCHAR ( 50 ) NOT NULL,
    vote INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(id),
    CONSTRAINT fk_project_feedback
        FOREIGN KEY (project_id)
            REFERENCES projects(id),
    CONSTRAINT fk_project_customer_feedback
        FOREIGN KEY (author_id)
            REFERENCES project_customers(id)
);

CREATE TABLE tags (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    label VARCHAR ( 16 ) NOT NULL,
    project_id uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_tag_project
        FOREIGN KEY (project_id)
            REFERENCES projects(id)
);

CREATE TABLE feedbacks_tags (
    tag_id uuid NOT NULL,
    feedback_id uuid NOT NULL,
    CONSTRAINT fk_feedback_tag_tag
        FOREIGN KEY (tag_id)
            REFERENCES tags(id),
    CONSTRAINT fk_feedback_tag_feedback
        FOREIGN KEY (feedback_id)
            REFERENCES feedbacks(id)
);

CREATE TABLE project_customers (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    project_id uuid NOT NULL,
    external_id VARCHAR ( 50 ) NULL,
    email VARCHAR ( 100 ) NOT NULL,
    ip_address text[] DEFAULT ARRAY[]::text[],
    logo_url VARCHAR ( 100 ) NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_project_project_customers
        FOREIGN KEY (project_id)
            REFERENCES projects(id)
);

CREATE TABLE feedback_votes (
    feedback_id uuid NOT NULL,
    customer_id uuid NOT NULL,
    CONSTRAINT fk_feedback_vote_feedback
        FOREIGN KEY (feedback_id)
            REFERENCES feedbacks(id),
    CONSTRAINT fk_feedback_vote_project_customer
        FOREIGN KEY (customer_id)
            REFERENCES project_customers(id)
);