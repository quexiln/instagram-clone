import axios from "axios";


export const Follow = async (followerId, followedUsername) => {
  await axios
    .post("http://localhost:8080/users/follow", {
      followerId,
      followedUsername
    })
};


