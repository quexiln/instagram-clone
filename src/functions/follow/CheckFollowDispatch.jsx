import axios from "axios";

export const CheckFollowDispatch = (followerId, followedUsername) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:8080/dataBase/follow/checkFollow", {
        followerId,
        followedUsername,
      });

      if (res.data) {
        return {checkFollow:true};
      } else {
        return {checkFollow:false};
      }
    } catch (error) {
      console.error("CheckFollowDispatch Error:", error);
      return {checkFollow:false};
    }
  };
};
