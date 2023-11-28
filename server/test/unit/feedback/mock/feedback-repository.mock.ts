import { FeedbackRepositoryInterface } from '../../../../src/hexagon/gateways/repository';
import { Feedback, FeedbackType } from '../../../../src/hexagon/model';

export class FeedbackRepositoryMock implements FeedbackRepositoryInterface {
    private feedbacks = new Map<string, Feedback>();

    async save(feedback: Feedback): Promise<Feedback> {
        this.feedbacks.set(feedback.id, feedback);

        return feedback;
    }

    async find(id: string): Promise<Feedback> {
        return this.feedbacks.get(id);
    }

    async loadFixtures() {}
}

const fixtures: Feedback[] = [
    Feedback.create({
        id: 'ffdd00e7-1c88-43b7-8c97-f0b6622c99c2',
        type: FeedbackType.Enhance,
        content: 'Améliorer le formulaire de retour',
        projectId: '18a595ce-4cc8-4398-9ef4-5a9d7db2f859',
    }),
    Feedback.create({
        id: 'e06889ba-715f-4923-b3e2-59faaaa553a5',
        type: FeedbackType.Bug,
        content: "L'email n'est pas pris en compte",
        projectId: '18a595ce-4cc8-4398-9ef4-5a9d7db2f859',
    }),
    Feedback.create({
        id: 'c42e53a5-1e4a-4352-939f-3217cdee0255',
        type: FeedbackType.Enhance,
        content: 'Améliorer le formulaire de retour',
        projectId: '68bde8c1-beef-4495-b6f2-0ceea15a3f98',
    }),
    Feedback.create({
        id: '71362602-66c9-4733-bd24-6109a9a72882',
        type: FeedbackType.Bug,
        content: 'La liste des utilisateurs semblent incomplète',
        projectId: '68bde8c1-beef-4495-b6f2-0ceea15a3f98',
    }),
];
