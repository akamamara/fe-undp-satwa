import axios from "axios";

const GetAvesResult = async (identificationValue) => {
  var split = identificationValue.split(".");
  split = split.map(function (val) {
    return val === "0" ? null : val;
  });
  console.log(split);
  let formData = new FormData();
  if (split[0] !== null) {
    formData.append("jenis_burung_ID", split[0]);
  }
  if (split[1] !== null) {
    formData.append("bentuk_paruh_ID", split[1]);
  }
  if (split[2] !== null) {
    formData.append("warna_ID", split[2]);
  }
  if (split[3] !== null) {
    formData.append("ukuran_tubuh_ID", split[3]);
  }
  if (split[4] !== null) {
    formData.append("tipe_cakar_ID", split[4]);
  }

  try {
    const resp = await axios.post("api/identifikasi/aves/result", formData);
    await console.log(resp);
    await console.log(formData);

    // await alert(resp.data.message);
    return resp.data.result;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default GetAvesResult;
