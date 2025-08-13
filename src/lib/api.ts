const API_BASE_URL = 'http://localhost:8000/api/v1';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Token ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(username: string, password: string) {
    const data = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.token = data.token;
    localStorage.setItem('auth_token', data.token);
    return data;
  }

  async register(username: string, email: string, password: string, role: string = 'patient') {
    const data = await this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role }),
    });
    this.token = data.token;
    localStorage.setItem('auth_token', data.token);
    return data;
  }

  async getProfile() {
    return this.request('/auth/profile/');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Drug interaction methods
  async checkDrugInteractions(medications: any[], patientAge?: number) {
    return this.request('/drugs/check-interactions/', {
      method: 'POST',
      body: JSON.stringify({ medications, patient_age: patientAge }),
    });
  }

  async searchMedications(query: string) {
    return this.request(`/drugs/search/?q=${encodeURIComponent(query)}`);
  }

  async getInteractionHistory() {
    return this.request('/drugs/interaction-history/');
  }

  // AI analysis methods
  async analyzeInteraction(medications: any[], patientAge?: number) {
    return this.request('/ai/analyze-interaction/', {
      method: 'POST',
      body: JSON.stringify({ medications, patient_age: patientAge }),
    });
  }

  async getDosageRecommendation(drugName: string, patientAge: number, patientWeight?: number, medicalConditions: string[] = []) {
    return this.request('/ai/dosage-recommendation/', {
      method: 'POST',
      body: JSON.stringify({ 
        drug_name: drugName, 
        patient_age: patientAge, 
        patient_weight: patientWeight, 
        medical_conditions: medicalConditions 
      }),
    });
  }

  async analyzeSideEffects(medications: any[], patientProfile: any = {}) {
    return this.request('/ai/analyze-side-effects/', {
      method: 'POST',
      body: JSON.stringify({ medications, patient_profile: patientProfile }),
    });
  }

  async extractFromText(text: string) {
    return this.request('/ai/extract-from-text/', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  // Dataset methods
  async getImportStatus() {
    return this.request('/datasets/import-status/');
  }

  async startImport(source: string) {
    return this.request('/datasets/start-import/', {
      method: 'POST',
      body: JSON.stringify({ source }),
    });
  }
}

export const apiClient = new ApiClient();