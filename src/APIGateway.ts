import 'whatwg-fetch';

/**
 * APIGateway
 */
export default class APIGateway {

  /**
   * Greating attributs
   */
  public greeting: number;

  constructor(message: number) {
    this.greeting = message;
  }

  /**
   * greet Test data
   * @return {Number} extract date
   */
  public greet(): number {
    return this.greeting;
  }

  // /**
  //  * fetch data function in api gateway
  //  * @return {Promise} extract date
  //  */
  // public graph(query: any): Promise<any> {
  //   return new Promise<T>((resolve, reject) => {
  //     const headers = getHeaders()
  //     if (DEBUG === true) {
  //       console.log(query)
  //     }

  //     window
  //       .fetch(`${API_URL}`, {
  //         method: 'POST',
  //         headers,
  //         body: JSON.stringify({ query }),
  //       })
  //       .then(async response => {
  //         if (
  //           response.status === 422 ||
  //           response.status === 403 ||
  //           response.status === 404 ||
  //           response.status === 500
  //         ) {
  //           return reject(await response.json());
  //         }
  //         return response.json()
  //       })
  //       .then(result => {
  //         if (result.errors) {
  //           reject(result.errors)
  //         } else if (result && result.data) {
  //           resolve(result.data);
  //         }
  //       })
  //       .catch(err => {
  //         return reject(err)
  //       })
  //   })
  // }
}