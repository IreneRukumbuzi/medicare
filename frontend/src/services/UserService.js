import axios from "axios";

class UserService {
  static BASE_URL = process.env.REACT_APP_BACKEND_URL;

  static async register(userData) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async login(credentials) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static logout() {
    localStorage.removeItem("token");
  }

  static async getYourProfile(token) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateProfile(userData, token) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/profile`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
