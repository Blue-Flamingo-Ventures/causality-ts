
type Headers = Record<string, string>;

export interface RequestOptions extends RequestInit {
  headers?: Headers;
}

export interface RequestQrCodeParams {
  key: string;
  token: string;
  browsers?: string;
}

export interface RequestQrCodeResponse {
  status: number;
  qrCodeLink?: string;
  qrcode?: string;
  deeplink?: string;
  message?: string;
}

export interface ApiStatusCheckParams {
  code: string
}

export interface ApiStatusCheckResponse {
  message: string;
  nfc_tag: string;
  chip_type: string;
  product_id: string;
  product_name: string;
  status: number;
}

export interface ClearUidsRequest {
  key: string;
  token: string;
  action: string;
}

export interface ClearUidsResponse {
  message: string,
  status: string,
}

const CAUSALITY_BASE_URL: string = "https://causality.xyz/api";

class CausalityClient {
  private baseURL: string;
  private defaultHeaders: Headers;
  private token: string;
  private key: string;

  constructor(key: string, token: string) {
    this.baseURL = CAUSALITY_BASE_URL; // causality base url
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
    this.token = token;
    this.key = key;
  }

  // Set a specific header
  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  // Remove a specific header
  removeHeader(key: string): void {
    delete this.defaultHeaders[key];
  }

  // helper method to make the actual fetch call
  private async _fetch(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...options.headers };

    const config: RequestOptions = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }

    return response.json();
  }

  private async post(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<any> {
    return this._fetch(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  // put/delete/get uneeded for now, may as well keep them in for future use
  private async put(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<any> {
    return this._fetch(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  private async get(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<any> {
    return this._fetch(endpoint, { ...options, method: "GET" });
  }

  private async delete(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<any> {
    return this._fetch(endpoint, { ...options, method: "DELETE" });
  }

  public async RequestQrCode(): Promise<RequestQrCodeResponse> {
    let params: RequestQrCodeParams = {
      key: this.key,
      token: this.token
    }
    const response = await this.post("/requestQrCode", params);
    return response as RequestQrCodeResponse;
  }

  public async ApiStatusCheck(
    params: ApiStatusCheckParams
  ): Promise<ApiStatusCheckResponse> {
    const response = await this.post("/apiStatusCheck", params);
    return response as ApiStatusCheckResponse;
  }

  public async ClearUids(): Promise<ClearUidsResponse> {
    let params: ClearUidsRequest = {
      key: this.key,
      token: this.token,
      action: "remove"
    }
    const response = await this.post("/clear_uids", params);
    return response as ClearUidsResponse;
  }
}

export default CausalityClient;
