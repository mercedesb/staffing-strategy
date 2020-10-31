import React, { useState, useEffect } from "react";

import { DealList } from "components";
import { useLocalStorage, usePipedrive } from "hooks";

const DEALS_STORAGE_KEY = "deals";
const STAGES_STORAGE_KEY = "stages";

export default function Projects() {
  const { get, set } = useLocalStorage();
  const { getDeals, getStages } = usePipedrive();

  const [deals, setDeals] = useState(get(DEALS_STORAGE_KEY) || []);
  const [stages, setStages] = useState(get(STAGES_STORAGE_KEY) || []);

  useEffect(() => {
    (async function () {
      if (!deals || deals.length === 0) {
        const dealsResponse = await getDeals();
        setDeals(dealsResponse.data);
        set(DEALS_STORAGE_KEY, dealsResponse.data);
      }

      if (!stages || stages.length === 0) {
        const stagesResponse = await getStages();
        setStages(stagesResponse.data);
        set(STAGES_STORAGE_KEY, stagesResponse.data);
      }
    })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <DealList deals={deals} stages={stages} />;
}
