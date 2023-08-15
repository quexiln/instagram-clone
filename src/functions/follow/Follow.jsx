import axios from "axios";


export const Follow = async (followerInput, followedInput,followingsTab=false) => {
  await axios
    .post("http://localhost:8080/dataBase/follow", {
      followerInput,
      followedInput,
      followingsTab
    })
};


