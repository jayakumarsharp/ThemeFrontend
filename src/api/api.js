import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3002";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PortfolioApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PortfolioApi.token}` };
    const params = (method === "get")
      ? data
      : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Login user */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup user */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get user */

  static async getUser(username) {
    let res = await this.request(`users/${username}/complete`);
    return res.user;
  }

  /** Update user */

  static async updateUser(username, data) {
    if (data.password === '')
      delete data.password;

    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Create a portfolio */

  static async newPortfolio(data) {
    let res = await this.request(`portfolios`, data, "post");
    return res.portfolio;
  }

  /** Update portfolio */

  static async updatePortfolio(id, data) {
    let res = await this.request(`portfolios/${id}`, data, 'patch');
    return { success: true, portfolio: res.portfolio };
  }

  /** Delete a portfolio */

  static async deletePortfolio(id) {
    let res = await this.request(`portfolios/${id}`, {}, "delete");
    return res.deleted;
  }

  /** Add a holding */

  static async addHolding(data) {
    try {
      let res = await this.request(`yhf/quote`, { symbols: data.symbol }, "post");
      if (res?.quotes?.length > 0) {
        let { holding } = await this.request(`holdings`, data, 'post');
        return { success: true, holding };
      } else {
        return { success: false, errors: ["Invalid symbol"] };
      }
    } catch (errors) {
      return { success: false, errors }
    }


  }

  /** Update a holding */

  static async updateHolding(id, data) {
    let res = await this.request(`holdings/${id}`, data, 'patch');
    return { success: true, holding: res.holding };
  }

  /** Delete a holding */

  static async deleteHolding(id) {
    let res = await this.request(`holdings/${id}`, {}, 'delete');
    return res.deleted;
  }

  /** Add symbol to watchlist -- convert to update on watchlist (add / remove) */

  static async addToWatchlist(username, symbol) {
    let res = await this.request(`users/${username}/watchlist/${symbol}`, {}, "post");
    return res.watched;
  }

  static async removeFromWatchlist(username, symbol) {
    let res = await this.request(`users/${username}/watchlist/${symbol}`, {}, "delete");
    return res.unwatched;
  }

  /**  External Yahoo Finance Data */

  static async getQuote(symbols) {
    let res = await this.request(`yhf/quote`, symbols, "post");
    return res.quotes;
  }

  static async getQuoteSummary(symbol) {
    let res = await this.request(`yhf/quote-summary`, symbol, "post");
    return res.quote;
  }

  static async searchQuote(searchVal) {
    let res = await this.request(`yhf/search`, { term: searchVal }, "get");
    return res.results;
  }

  static async getTrendingSymbols() {
    let res = await this.request(`yhf/trending`);
    return res;
  }

  static async getRecommendations(searchVal) {
    try {
      let res = await this.request(`yhf/recommend`, { term: searchVal });
      return { success: true, res };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  static async getHistorical(chartParams) {
    try {
      let res = await this.request(`yhf/historical`, chartParams);
      return { success: true, res };
    } catch (errors) {
      return { success: false, errors };
    }
  }
}

export default PortfolioApi;