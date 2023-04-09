import { Campaign, campaignState } from "@/atoms/campaignAtom";
import CountryChart from "@/components/DoughnutChart";
import CustomChart from "@/components/customChart";
import OtherChart from "@/components/OtherChart";
import Spinner from "@/components/Spinner";
import useCampaign from "@/hooks/useCampaign";
import { Button, Card, SimpleGrid, Text } from "@mantine/core";
import { IconInfoCircle, IconPlayerPause } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

type CampaignIdProps = {};

const CampaignId: React.FC<CampaignIdProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const campaigns = useRecoilValue(campaignState);
  const [campaign, setCampaign] = useState<Campaign>();

  const { getCampaignById } = useCampaign();

  const campaignById = useMemo(() => {
    return campaigns.find((campaign) => campaign.campaignID === id);
  }, [campaigns, id]);

  useEffect(() => {
    if (campaignById) {
      setCampaign(campaignById);
    } else if (campaigns.length === 0 && id !== undefined) {
      getCampaignById(id as string).then((res) => setCampaign(res));
    }
  }, [campaignById, campaigns.length, getCampaignById, id]);

  if (campaign === undefined) return <Spinner />;

  const first = {
    "Sender's Name": campaign.sender_name,
    "Sender's Email": campaign.sender_email,
    Subject: campaign.subject,
    "Email Sent": campaign.email_sent.rate.toLocaleString(),
    Date: new Date(campaign.createdAt).toDateString(),
    Time: new Date(campaign.createdAt)
      .toISOString()
      .split("T")[1]
      .split(".")[0],
  };
  return (
    <>
      <section>
        <div className="flex justify-between no__print">
          <h2 className="font-bold text-[25px]">Campaign Information</h2>
        </div>

        <aside className="flex items-center mt-10 justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-[20px]">
              Campaign Id:{" "}
              <span className="font-bold">{campaign.campaignID}</span>
            </h1>
          </div>
          <Button className="bg-[#1c7ed6]" onClick={() => window.print()}>
            Export Report
          </Button>
        </aside>

        <div className="mt-4">
          <article
            className="mt-2 flex flex-wrap bg-[#fafafa] border"
            style={{ overflowWrap: "anywhere" }}
          >
            {Object.entries(first).map(([key, value], index) => (
              <aside key={index} className={`w-[210px] my-3 py-3 px-3`}>
                <div className="flex items-center gap-1">
                  <h2 className="font-[500]">{key}:</h2>
                </div>
                <p className="font-[400] text-[15px] mt-3">{value}</p>
              </aside>
            ))}
          </article>
        </div>
        <SimpleGrid
          cols={1}
          className="items-center mt-10 w-[100%] px-8 justify-items-center"
          spacing="lg"
          breakpoints={[{ minWidth: 980, cols: 2, spacing: "md" }]}
        >
          <CustomChart
            color="green"
            value={Number(campaign.recipient_left.percentage)
              .toFixed(2)
              .toString()}
            header="Recipients Reached"
          />
          <CustomChart
            color="orange"
            value={Number(campaign.recipient_reached.percentage)
              .toFixed(2)
              .toString()}
            header="Recipients Left"
          />
        </SimpleGrid>
        <Card.Section className="w-[100%] m-auto">
          <Card className="drop-shadow-2xl w-[250px] text-center rounded-xl m-auto">
            <div>
              <h2 className="font-[600] text-[20px] mb-4">Campaign Score</h2>
              <p className="font-[400]">Report updated every 1 hour</p>
            </div>
            <CustomChart
              color="blue"
              header=""
              value={Number(campaign.campaign_score.percentage)
                .toFixed(2)
                .toString()}
            />
          </Card>
        </Card.Section>
      </section>
    </>
  );
};
export default CampaignId;
