import 'whatwg-fetch';
/**
 * APIGateway
 */
export default class APIGateway {
  /**
   * API Key from client
   */
  private apiKey: string;
  /**
   * API URL from client
   */
  private apiUrl: string;

  constructor({ apiKey, apiUrl }: any) {
    if (!apiKey || !apiUrl) {
      throw new Error('You must specify API Key and API URL');
    }
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  /**
   * Convert method to promise
   * @param promise function
   */
  private promisify(func: Promise<any>): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      func.then(async (response) => {
        if (response.status >= 400) {
          return reject(await response.json());
        }
        return response.json();
      }).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        resolve(result.data);
      })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  /**
   * create method
   * @param body
   */
  public create(model: string, type: string, body: any): Promise<any> {
    return this.promisify(window.fetch(this.apiUrl, {
      headers: {
        authorization: `Bearer ${this.apiKey}`,
      },
      method: 'POST',
      body: JSON.stringify({
        type,
        model,
        values: body,
      }),
    }));
  }

  /**
   * update method
   * @param body
   */
  public update(model: string, type: string, where: any): Promise<any> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          type,
          model,
          where,
        }),
      }));
  }

  /**
   * delete method
   * @param body
   */
  public delete(model: string, type: string, where: any): Promise<any> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          type,
          model,
          where,
        }),
      }));
  }

  /**
   * findAll method
   * @param body
   */
  public findAll(model: string, type: string, where: any, projection: any[]): Promise<any> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          type,
          model,
          where,
          projection,
        }),
      }));
  }

  /**
   * create method
   * @param body
   */
  public findOne(model: string, type: string, where: any, projection: any[]): Promise<any> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          type,
          model,
          where,
          projection,
        }),
      }));
  }

}