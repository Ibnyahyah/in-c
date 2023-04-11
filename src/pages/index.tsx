import { GetServerSidePropsContext } from "next";
import { Campaign } from "@/atoms/campaignAtom";
import CampaignPerformance, {
  campaignRowData,
} from "@/components/CampaignPerformance";
import Spinner from "@/components/Spinner";
import useCampaign from "@/hooks/useCampaign";
import { Button, Divider, SimpleGrid, TextInput } from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [campaignID, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { getCampaignById } = useCampaign();
  const router = useRouter();

  function getCampaign() {
    setLoading(true);
    getCampaignById(campaignID)
      .then((res) => {
        if (res?.message == "campaign not found") return;
        setLoading(false);
        router.push(`campaign-information/${campaignID}`);
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
      });
  }
  return (
    <section>
      <div className="py-10 text-center">
        <h2 className="font-bold text-[30px]">Welcome To Inbox peak</h2>
        <p>Enter Your campaign ID to see your campaign analytics and info.</p>
      </div>
      <Divider />
      <article className="mt-6">
        <div className="w-[50%] m-auto flex gap-2">
          <TextInput
            required
            placeholder="IP0E911C"
            value={campaignID}
            onChange={(event) => setValue(event.currentTarget.value)}
            className="flex-1"
          />
          {loading ? (
            <Button className="bg-black-50">
              <Spinner />
            </Button>
          ) : (
            <Button className="bg-black" onClick={getCampaign}>
              Check
            </Button>
          )}
        </div>
      </article>
    </section>
  );
}
