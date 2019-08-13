import 'whatwg-fetch';

/**
 * APIGatewayFetch
 */
export default class APIGatewayFetch {
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
   * Featch query method
   * @param promise function
   */
  public fetch({ body, method = 'POST', headers = {} }: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      window.fetch(this.apiUrl, {
        headers: {
          Authorization: `Bearer ${this.apiKey} domain=${window.location.host}`,
          ...headers,
        },
        method,
        body,
      }).then(async (response) => {
        if (response.status >= 400) {
          return reject(await response.json());
        }
        return response.json();
      }).then((result) => {
        if (result.errors) {
          return reject(result.errors);
        }
        return resolve(result.data);
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
  public create({ model, values, projection }: any): Promise<any> {
    return this.fetch({
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        query: {
          type :'create',
          model,
          projection,
          values,
        },
      }),
    });
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
  public update({ model, values, projection, where }: any): Promise<any> {
    return this.fetch({
      body: JSON.stringify({
        query: {
          type: 'update',
          values,
          projection,
          model,
          where,
        },
      }),
    });
  }

  /**
   * delete method
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @return {Promise}
   */
  public delete({ model, where }: any): Promise<boolean> {
    return this.fetch({
      body: JSON.stringify({
        query: {
          type: 'delete',
          model,
          where,
        },
      }),
    });
  }

  /**
   * findAll method
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @param  {string[]} projection Columns to be returned for findOne and findAll (optional)
   * @return {Promise}
   */
  public findAll({ model, projection, where, include }: any): Promise<any[]> {
    return this.fetch({
      body: JSON.stringify({
        query: {
          type: 'findAll',
          model,
          include,
          where,
          projection,
        },
      }),
    });
  }

  /**
   * findOne method
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @param  {string[]} projection Columns to be returned for findOne and findAll (optional)
   * @return {Promise}
   */
  public findOne({ model, projection, where, include }: any): Promise<any> {
    return this.fetch({
      body: JSON.stringify({
        query: {
          type: 'findOne',
          model,
          include,
          where,
          projection,
        },
      }),
    });
  }

  /**
   * count method
   * @param  {String}   type Type of operation to be performed (findOne, findAll, create, etc.)
   * @param  {String}   model model name to perform the operation in
   * @param  {Object}   where Value for matching the row(s) to be selected
   * @return {Promise}
   */
  public count({ model, where }: any): Promise<boolean> {
    return this.fetch({
      body: JSON.stringify({
        query: {
          type: 'count',
          model,
          where,
        },
      }),
    });
  }
}