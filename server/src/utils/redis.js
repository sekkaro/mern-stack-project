import redis from "redis";

const client = redis.createClient(process.env.REDIS_URL);

export const setJWT = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      client.set(key, value, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (err) {
    console.log(err);
  }
};
