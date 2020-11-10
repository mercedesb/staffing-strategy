import React, { useState, useEffect } from "react";

import { DealsContext } from "contexts";
import { DealList } from "components";
import { useServer, useLocalStorage } from "hooks";

const STAGES_STORAGE_KEY = "stages";

export default function Opportunities() {
  const { deals } = React.useContext(DealsContext);
  const { get, set } = useLocalStorage();
  const { getStages } = useServer();

  const [stages, setStages] = useState([]);

  useEffect(() => {
    (async function () {
      let stagesResponse = stages;
      if (process.env.REACT_APP_CACHE_IN_LOCAL_STORAGE) {
        stagesResponse = get(STAGES_STORAGE_KEY) || stages;
      }

      if (!stagesResponse || stagesResponse.length === 0) {
        stagesResponse = await getStages();
        setStages(stagesResponse.data);
        if (process.env.REACT_APP_CACHE_IN_LOCAL_STORAGE) {
          set(STAGES_STORAGE_KEY, stagesResponse.data);
        }
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <DealList deals={deals} stages={stages} />;
}
