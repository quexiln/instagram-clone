import axios from "axios";


export const UnFollow = async (followerId, followedUsername) => {
  await axios
    .post("http://localhost:8080/users/unFollow", {
      followerId,
      followedUsername
    })
};


