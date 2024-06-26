
import {API_URL}  from '../config';


type ApiFetchT = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | string;
  isValidate?: boolean;
};

type ApiFetchResponseT = {
  code: string;
  message: string;
  data: unknown;
};


function codeWarning(code: string): boolean {
  const warning = ['BE1'];
  return warning.some((c) => code.startsWith(c));
}

export async function apiFetch<T>(props: ApiFetchT): Promise<T> {
  const { method, url, headers, body, isValidate = true } = props;
  try {


    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = (await response.json()) as ApiFetchResponseT;
    return data as T;
   
  } catch (err: unknown) {
    const { code, message } = err as { code: string; message: string };

    if (code && codeWarning(code)) {
      if (!isValidate) return {} as T;
    
      return {} as T;
    }

    console.log(`\x1b[31m Error apiFetch: ${code || message || err} \x1b[0m`);
  

    return {} as T;
  }
}
