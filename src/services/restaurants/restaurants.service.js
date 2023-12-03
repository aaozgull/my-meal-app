import { mocks } from "./mock";
import camelize from "camelize";

export const restaurantsRequest = ({
  location = "37.7749295,-122.4194155",
}) => {
  console.log(mocks);
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

const restaurantsTransform = ({ results = [] }) => {
  const mappedResult = results.map((restaurant) => {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.busines_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResult);
};

restaurantsRequest()
  .then(restaurantsTransform)
  .then((transformResponse) => {
    console.log(transformResponse);
  })
  .catch((err) => {
    console.log("Error");
  });
