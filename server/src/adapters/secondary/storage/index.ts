import { FileStorage } from './file.storage';
import { FileStorageInterface } from '../../../hexagon/gateways/storage';

export * from './file.storage';

export const StorageProviders = [
    {
        provide: FileStorageInterface,
        useClass: FileStorage,
    },
];
