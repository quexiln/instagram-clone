import axios from "axios";


export const UnFollow = async (followerInput, followedInput ,followingsTab=false) => {
  await axios
    .post("http://localhost:8080/dataBase/follow/unFollow", {
      followerInput,
      followedInput,
      followingsTab
    })
};


