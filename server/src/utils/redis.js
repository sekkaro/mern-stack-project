import redis from "redis";

const client = redis.createClient(process.env.REDIS_URL);

export const redisSet = (key, value, exp = null) => {
  return new Promise((resolve, reject) => {
    try {
      if (!exp) {
        client.set(key, value, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      } else {
        client.set(key, value, "ex", exp, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const redisGet = (key) => {
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

export const redisDelete = (key) => {
  try {
    client.del(key);
  } catch (err) {
    console.log(err);
  }
};
