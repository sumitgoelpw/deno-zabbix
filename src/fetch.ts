export interface IPostConfigBodyParams {
  user?: string;
  password?: string;
  // deno-lint-ignore no-explicit-any
  [propName: string]: any;
}

interface IPostConfig {
  url: string;
  auth: string | null;
  method: string;
  params: IPostConfigBodyParams;
  options?: RequestInit;
}

export async function Post(config: IPostConfig) {
  try {
    const url = config.url;
    const auth = config.auth;
    const method = config.method;
    const params = config.params;
    const options = config.options;

    const configInit: RequestInit = Object.assign({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: String(Math.random()),
        auth: auth,
      }),
    }, options);

    const response = await fetch(url, configInit);
    return response.json();
  } catch (error) {
    throw error;
  }
}