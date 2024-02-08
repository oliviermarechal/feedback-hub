import { FileStorageInterface } from '../../../hexagon/gateways/storage';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FileStorage implements FileStorageInterface {
    constructor(private readonly httpService: HttpService) {}
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file.buffer.toString('base64'));
        const response = await this.httpService.axiosRef.post(
            'https://imgcdn.dev/api/1/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-API-Key': '5386e05a3562c7a8f984e73401540836',
                },
            },
        );

        if (response.status !== 201) {
            console.log(response.data);
            throw new Error('Error uploading file');
        }

        return response.data.image.url;
    }
}
