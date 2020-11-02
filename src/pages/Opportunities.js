import React, { useState, useEffect } from "react";

import { DealsContext } from "contexts";
import { DealList } from "components";
import { usePipedrive, useLocalStorage } from "hooks";

const STAGES_STORAGE_KEY = "stages";

export default function Opportunities() {
  const { deals } = React.useContext(DealsContext);
  const { get, set } = useLocalStorage();
  const { getStages } = usePipedrive();

  const [stages, setStages] = useState(get(STAGES_STORAGE_KEY) || []);

  useEffect(() => {
    (async function () {
      if (!stages || stages.length === 0) {
        const stagesResponse = await getStages();
        setStages(stagesResponse.data);
        set(STAGES_STORAGE_KEY, stagesResponse.data);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <DealList deals={deals} stages={stages} />;
}
