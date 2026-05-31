import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface User {
  username: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private getHeaders() {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    return headers;
  }

  async register(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, password });
      if (response.data.token) this.setToken(response.data.token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка регистрации');
    }
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      if (response.data.token) this.setToken(response.data.token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка входа');
    }
  }

  async getTracks(): Promise<any[]> {
    const response = await axios.get(`${API_URL}/tracks`, { headers: this.getHeaders() });
    return response.data;
  }

  async getFavorites(): Promise<any[]> {
    const response = await axios.get(`${API_URL}/favorites`, { headers: this.getHeaders() });
    return response.data;
  }

  async addToFavorites(trackId: string): Promise<void> {
    await axios.post(`${API_URL}/favorites`, { trackId }, { headers: this.getHeaders() });
  }

  async removeFromFavorites(trackId: string): Promise<void> {
    await axios.delete(`${API_URL}/favorites`, { data: { trackId }, headers: this.getHeaders() });
  }

  logout() {
    this.clearToken();
  }
}

export const api = new ApiService();