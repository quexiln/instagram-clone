import axios from "axios";
import { Buffer } from "buffer";

export const getProfileInformations = (input) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:8080/dataBase/profile/profileInformations", { input });

      const buffer = Buffer.from(res.data.profilePhoto.data.data);
      let url = buffer.toString("base64");

      return {
        username:res.data.username,
        nameSurname: res.data.nameSurname,
        profilePhoto: `data:${res.data.profilePhoto.contentType};base64,${url}`,
        posts:res.data.posts,
        followers: res.data.followers,
        followings: res.data.followings,
        checkData: true, 
      };
    } catch (err) {
      return {
        checkData: false, 
      };
    }
  };
};
