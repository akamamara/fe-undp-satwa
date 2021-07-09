import axios from "axios";

const handleLogin = async (user) => {
  try {
    const resp = await axios.post("api/login", user);
    await console.log(resp);
    await alert(resp.data.message);
    await localStorage.setItem("token", resp.data.access_token);
    return resp;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default handleLogin;
