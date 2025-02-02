import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {

  // the token for interactive with the API will be stored here.

  static token;

  /** set token if token is in state. */

  static setToken(newToken){
    JoblyApi.token = newToken;
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  /** Get all companies */

  static async getAll(data){
    let res = await this.request('companies', data)
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all Jobs */

  static async getAllJobs(data){
    let res = await this.request('jobs', data)
    return res.jobs;
  }

  /** Registers a user */

  static async registerUser(formData){
    let res = await this.request('auth/register', formData, "post")
    return res.token;
  }

  /** Logs in a user */

  static async loginUser(formData){
    let res = await this.request('auth/token', formData, "post");
    return res.token;
  }

  /** gets user information from username */

  static async getUser(username){
    let res = await this.request(`users/${username}`)
    return res.user;
  }

  /** takes in user obj and updates user  */

  static async updateUser(formData){
    const { username, ...updateData } = formData;
    let res = await this.request(`users/${username}`, updateData, "patch");
    return res.user;
  }

  /** takes a username and a job's id to apply to a job */

  static async applyToJob(username, jobId){
    let res = await this.request(`users/${username}/jobs/${jobId}`,{}, "post");
    return res.applied;
  }

}

export default JoblyApi;