import axios from "axios";

const GetMammalsResult = async (identificationValue) => {
  var split = identificationValue.split(".");
  split = split.map(function (val) {
    return val === "0" ? null : val;
  });
  console.log(split);

  let formData = new FormData();
  if (split[0] !== null) {
    formData.append(" tipe_mammals_ID", split[0]);
  }
  if (split[1] !== null) {
    formData.append("alat_gerak_ID", split[1]);
  }
  if (split[2] !== null) {
    formData.append("third_attribute_ID", split[2]);
  }
  if (split[3] !== null) {
    formData.append("jenis_kulit_ID", split[3]);
  }
  if (split[4] !== null) {
    formData.append("ukuran_tubuh_mammals_ID", split[4]);
  }
  if (split[5] !== null) {
    formData.append("bertanduk_bertaring_ID", split[5]);
  }
  if (split[6] !== null) {
    formData.append("has_moncong", split[6]);
  }
  if (split[7] !== null) {
    formData.append("has_ekor", split[7]);
  }
  if (split[8] !== null) {
    formData.append("jumlah_kuku", split[8]);
  }
  if (split[9] !== null) {
    formData.append("jumlah_cula", split[9]);
  }

  try {
    const resp = await axios.post("api/identifikasi/mammals/result", formData);
    await console.log(resp);
    return resp.data.result;
  } catch (err) {
    return err.response.data.message;
  }
};

export default GetMammalsResult;
