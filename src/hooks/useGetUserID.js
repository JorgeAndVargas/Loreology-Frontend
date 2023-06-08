import { useState, useEffect } from "react";
import axios from "axios";

export const useGetUserID = () => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const response = await axios.get("https://loreology.herokuapp.com/getUserID");
        setUserID(response.data.userID);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserID();
  }, []);

  return userID;
};
