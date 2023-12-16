import { BACKEND_ENDPOINT } from '@constants/env';
import axios from 'axios';

export default class CanvasStudioService {
  private url = `${BACKEND_ENDPOINT}/api/studio`;

  public async getUnsplashPhotos(query: string) {
    try {
      const response = await axios.get(`${this.url}/photos/unsplash?query=${query}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const canvasStudioService = new CanvasStudioService();
