import { BACKEND_ENDPOINT } from '@constants/env';
import axios from 'axios';
import { PostsData, Node as ProductHuntPostNode } from '../models/producthunt';

const url = `${BACKEND_ENDPOINT}/api/producthunt`;

export default class ProductHuntService {
  public async getTopProducts(): Promise<PostsData> {
    try {
      const response = await axios.get(`${url}/products`);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getProductBySlug(slug: string, after?: string): Promise<ProductHuntPostNode> {
    try {
      const response = await axios.get(`${url}/products/${slug}?after=${after || ''}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const productHuntService = new ProductHuntService();
