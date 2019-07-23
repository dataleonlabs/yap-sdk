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

  // /**
  //  * Convert method to promise
  //  * @param promise function
  //  */
  // private promisify(func: Promise<any>): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     console.info(func);
  //     func.then(async (response) => {
  //       console.info(response);
  //       if (
  //         response.status === 422 ||
  //         response.status === 403 ||
  //         response.status === 404 ||
  //         response.status === 500
  //       ) {
  //         return reject(await response.json());
  //       }
  //       return response.json();
  //     })
  //       .then((result) => {
  //         if (result.errors) {
  //           reject(result.errors);
  //         } else if (result && result.data) {
  //           resolve(result.data);
  //         }
  //       })
  //       .catch((err) => {
  //         return reject(err);
  //       });
  //   });
  // }

  /**
   * create method
   * @param body
   */
  public create(model: string, type: string, body: any): Promise<any> {
    console.info(model);
    console.info(type);
    console.info(body);
    console.info(this.apiUrl);
    return new Promise((resolve, reject) => {
      window.fetch(this.apiUrl, {
        headers: {
          authorization: `Bearer ${this.apiKey}`,
        },
        method: 'POST',
        body: JSON.stringify({
          type,
          model,
          values: body,
        }),
      }).then(async (response) => {
        console.info(response);
        if (
          response.status === 422 ||
          response.status === 403 ||
          response.status === 404 ||
          response.status === 500
        ) {
          return reject(await response.json());
        }
        return response.json();
      })
        .then((result) => {
          if (result.errors) {
            reject(result.errors);
          } else if (result && result.data) {
            resolve(result.data);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  // /**
  //  * create method
  //  * @param body
  //  */
  // public update(model: string, type: string, query: any, body: any): Promise<any> {
  //   return this.promisify(
  //     window.fetch(this.apiUrl, {
  //       headers: {
  //         authorization: `Bearer ${this.apiKey}`,
  //       },
  //       body: JSON.stringify({
  //         type,
  //         model,
  //         query,
  //         values: body,
  //       }),
  //     }));
  // }

  // /**
  //  * create method
  //  * @param body
  //  */
  // public delete(model: string, type: string, query: any): Promise<any> {
  //   return this.promisify(
  //     window.fetch(this.apiUrl, {
  //       headers: {
  //         authorization: `Bearer ${this.apiKey}`,
  //       },
  //       body: JSON.stringify({
  //         type,
  //         model,
  //         query,
  //       }),
  //     }));
  // }

  // /**
  //  * create method
  //  * @param body
  //  */
  // public findAll(model: string, type: string, query: any): Promise<any> {
  //   return this.promisify(
  //     window.fetch(this.apiUrl, {
  //       headers: {
  //         authorization: `Bearer ${this.apiKey}`,
  //       },
  //       body: JSON.stringify({
  //         type,
  //         model,
  //         query,
  //       }),
  //     }));
  // }

  // /**
  //  * create method
  //  * @param body
  //  */
  // public findOne(model: string, type: string, query: any): Promise<any> {
  //   return this.promisify(
  //     window.fetch(this.apiUrl, {
  //       headers: {
  //         authorization: `Bearer ${this.apiKey}`,
  //       },
  //       body: JSON.stringify({
  //         type,
  //         model,
  //         query,
  //       }),
  //     }));
  // }

}