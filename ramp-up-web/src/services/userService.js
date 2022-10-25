import axios from "axios";
let data = [];

const generateid = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
    0
  ) + 1;

export const findUser = async ({ email, password }) => {
  console.log("axios", email, password);
  const res = await axios({
    method: "post",
    url: "http://localhost:3000/user/signin",
    params: { email, password },
  });
  return res;
};

export const insertUser = async (user) => {
  user.id = generateid(data);
  user.inEdit = false;
  const body = {
    User: user.name,
    password: user.password,
    email: user.email,
  };
  if (!user.name || !user.email || !user.password) {
    alert("Incorrect Validation");
  } else {
    data.unshift(user);
    const resdata = await axios.post("http://localhost:3000/user/signup", body);
    return resdata;
  }
};
