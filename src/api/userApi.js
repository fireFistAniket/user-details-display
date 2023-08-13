const url = "https://602e7c2c4410730017c50b9d.mockapi.io/users";
const userList = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const userDetails = async (userId) => {
  try {
    const res = await fetch(url + "/" + userId);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { userList, userDetails };
