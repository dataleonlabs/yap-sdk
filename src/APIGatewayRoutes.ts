import 'whatwg-fetch';

/**
 * APIGatewayRoutes
 */
export default class APIGatewayRoutes {
  /**
   * API Key from client
   */
  private apiKey: string;
  /**
   * API URL from client
   */
  private apiUrl: string;

  /**
   * constructor
   * @param apiKey apikey service
   * @param apiUrl apiUrl @example https://hooks.youngapp.co/new-hook--
   */
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
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @param  {Object}   values Values for the new record
   * @param  {string[]} projection Columns to be returned for findOne and findAll (optional)
   * @return {Promise}
   */
  public create({ model, type, values, projection }: any): Promise<any> {
    return this.promisify(window.fetch(this.apiUrl, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'YAP-Domain': window.location.host,
      },
      method: 'POST',
      body: JSON.stringify({
        type,
        model,
        projection,
        values,
      }),
    }));
  }

  /**
   * count method
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @param  {Object}   values Values for the new record
   * @param  {string[]} projection Columns to be returned for findOne and findAll (optional)
   * @return {Promise}
   */
  public update({ model, type, values, projection, where }: any): Promise<any> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'YAP-Domain': window.location.host,
        },
        body: JSON.stringify({
          type,
          values,
          projection,
          model,
          where,
        }),
      }));
  }

  /**
   * delete method
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @return {Promise}
   */
  public delete({ model, type, where }: any): Promise<boolean> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'YAP-Domain': window.location.host,
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
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @param  {string[]} projection Columns to be returned for findOne and findAll (optional)
   * @return {Promise}
   */
  public findAll({ model, type, projection, where }: any): Promise<any[]> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'YAP-Domain': window.location.host,
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
   * findOne method
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @param  {string[]} projection Columns to be returned for findOne and findAll (optional)
   * @return {Promise}
   */
  public findOne({ model, type, projection, where }: any): Promise<any> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'YAP-Domain': window.location.host,
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
   * count method
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @return {Promise}
   */
  public count({ model, type, where }: any): Promise<boolean> {
    return this.promisify(
      window.fetch(this.apiUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'YAP-Domain': window.location.host,
        },
        body: JSON.stringify({
          type,
          model,
          where,
        }),
      }));
  }

}