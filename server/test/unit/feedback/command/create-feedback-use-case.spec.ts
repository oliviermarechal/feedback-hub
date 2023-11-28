import {
    CreateFeedbackCommand,
    CreateFeedbackUseCase,
} from '../../../../src/hexagon/use-cases/command';
import { FeedbackType } from '../../../../src/hexagon/model';
import { FeedbackRepositoryMock } from '../mock';

describe('Create feedback', () => {
    let useCase: CreateFeedbackUseCase;
    const feedbackRepository = new FeedbackRepositoryMock();

    beforeAll(async () => {
        useCase = new CreateFeedbackUseCase(feedbackRepository);
    });

    it('Happy flow', async () => {
        const feedback = await useCase.handle(
            new CreateFeedbackCommand(
                'uuid_project',
                FeedbackType.Enhance,
                'coucou',
            ),
        );

        expect(feedback.projectId).toBe('uuid_project');
        expect(feedback.content).toBe('coucou');
        const rowDatabase = await feedbackRepository.find(feedback.id);
        expect(rowDatabase).not.toBeUndefined();
        expect(rowDatabase.content).toBe('coucou');
    });
});
