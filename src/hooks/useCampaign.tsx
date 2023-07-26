import { useCallback } from "react";

const useCampaign = () => {
  const getCampaignById = useCallback(async (id: string) => {
    try {
      const res = await fetch(`https://inbox-peak.onrender.com/campaign/${id}`);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("getCampaignById Error", error);
    }
  }, []);

  return { getCampaignById };
};
export default useCampaign;
