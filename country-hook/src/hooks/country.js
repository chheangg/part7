import { useEffect, useState } from "react";

import { getCountry } from "../services/countries";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      getCountry(name)
        .then(data => setCountry(data))
        .catch(err => setCountry(null))
    }
  }, [name])

  return country;
}