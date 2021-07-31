import axios from "axios";

const handleLogin = async (user) => {
  //TODO : Poup here
  try {
    const resp = await axios.post("api/login", user);
    await console.log(resp);
    await localStorage.setItem("token", resp.data.access_token);
    return resp;
  } catch (err) {
    console.log(err);
  }
};

export default handleLogin;
