import axios from "axios";

export const getAllTickets = () =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:3001/api/tickets", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1bkBqdW4uY29tIiwiaWF0IjoxNjI2ODU2MDU3LCJleHAiOjE2MjY4NTY5NTd9.Ef6qPvL3AtGzur8Zv7kBPn8PXwP5xJYEvXS75iBAl_w",
        },
      });

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
