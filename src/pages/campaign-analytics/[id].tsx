import { Campaign, campaignState } from "@/atoms/campaignAtom";
import DoughnutChart from "@/components/DoughnutChart";
import OtherChart from "@/components/OtherChart";
import Spinner from "@/components/Spinner";
import useCampaign from "@/hooks/useCampaign";
import { Button, Card, SimpleGrid } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { FaArrowRight } from "react-icons/fa";

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

  const second = {
    Sent: campaign.email_sent.percentage.toFixed(2),
    "Open Rate": campaign.open_rate.percentage.toFixed(2),
    "Inbox Rate": campaign.inbox_rate.percentage.toFixed(2),
    "Bounce Rate": campaign.bounce_rate.rate.toFixed(2),
    "unsubscribe Rate": campaign.unsubscribe.percentage.toFixed(2),
    "Click Rate": campaign.click_rate.percentage.toFixed(2),
    "Spam Rate": campaign.spam_rate.percentage.toFixed(2),
    "Total recipients": campaign.total_recipients.percentage.toFixed(2),
  };

  return (
    <>
      <section>
        <div className="flex justify-between no__print">
          <h2 className="font-bold text-[25px]">Campaign Analytics</h2>
        </div>

        <aside className="flex items-center mt-10 justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-[20px]">
              Campaign Id:{" "}
              <span className="font-bold">{campaign.campaignID}</span>
            </h1>
          </div>
          <div className="my-6 flex justify-between items-center">
            <Link
              className="bg-[#1c7ed6] p-2 rounded text-[#fff] hover:opacity-70 mr-4"
              title="Download CSV file"
              href={campaign.uploaded_csv}
              onClick={(e) => {
                e.preventDefault();
                const downloadName = "inboxpeak.csv"; // Replace with your desired download name
                const link = document.createElement("a");
                link.href = (e.target as HTMLAnchorElement).href; // Cast e.target to HTMLAnchorElement
                link.setAttribute("download", downloadName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Email log
            </Link>
            <Button className="bg-[#111111] " onClick={() => window.print()}>
              Export Report
            </Button>
          </div>
        </aside>

        <div className="mt-6">
          <h2>Delivery</h2>
          <article className="mt-2 flex items-center flex-wrap bg-[#fafafa] border justify-between">
            {Object.entries(second).map(([key, value], index) => (
              <aside
                key={index}
                className={`w-[210px] py-8 ml-2 px-2 ${
                  index === 3 ? "" : "border-r-[1px]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-[500]">{key}</h2>
                  <IconInfoCircle stroke={1.5} size="1.1rem" />
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-[30px] mt-4 text-[#10c581]">
                    {value}%
                  </h2>
                  <p className="font-[400] text-[15px] mt-3 bg-slate-200 rounded-[20px] px-2 text-center flex items-center gap-1">
                    {value}
                    <FaArrowRight size={12} />
                  </p>
                </div>
              </aside>
            ))}
          </article>
        </div>
        <SimpleGrid
          cols={1}
          className="items-center my-10 w-[100%] px-8 gap-2"
          spacing="lg"
          breakpoints={[{ minWidth: 980, cols: 2, spacing: "md" }]}
        >
          <Card.Section>
            <Card className="drop-shadow-2xl w-[90%] text-center rounded-xl m-auto">
              <DoughnutChart
                header="Source of Traffic"
                chartData={campaign.source_of_traffic_percentage}
              />
            </Card>
          </Card.Section>
          <Card.Section>
            <Card className="drop-shadow-2xl w-[90%] text-center rounded-xl m-auto">
              <DoughnutChart
                header="Device Type"
                chartData={campaign.device_type_percentage}
              />
            </Card>
          </Card.Section>
        </SimpleGrid>
        <Card.Section>
          <Card withBorder>
            <SimpleGrid
              cols={1}
              className="items-center my-10 w-[100%] px-8"
              spacing="lg"
              breakpoints={[{ minWidth: 980, cols: 2, spacing: "md" }]}
            >
              <DoughnutChart
                header="Countries"
                chartData={campaign.countries_percentage}
              />
              <OtherChart chartData={campaign.countries_percentage} />
            </SimpleGrid>
          </Card>
        </Card.Section>
      </section>
    </>
  );
};
export default CampaignId;
