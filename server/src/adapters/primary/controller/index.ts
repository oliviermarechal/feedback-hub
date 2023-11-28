import { FeedbackController } from './feedback.controller';
import { UserController } from './user.controller';
import { ProjectController } from './project.controller';
import { ExternalController } from './external.controller';
import { TagController } from './tag.controller';

export * from './external.controller';
export * from './feedback.controller';
export * from './user.controller';
export * from './project.controller';
export * from './tag.controller';

export const Controllers = [
    ExternalController,
    FeedbackController,
    UserController,
    ProjectController,
    TagController,
];
