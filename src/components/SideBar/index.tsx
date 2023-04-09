import { createStyles, Navbar, ScrollArea } from "@mantine/core";
import { IconAdjustments, IconHome, IconSend } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { LinksGroup } from "./NavbarLinksGroup";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${"1px"} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: "10px",
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${100} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function HeaderComponent({ toggle }: { toggle: () => void }) {
  const { classes } = useStyles();

  const router = useRouter();
  const pathname = router.query.id;
  const data = [
    { label: "Check a campaign", icon: IconHome, route: "/" },
    {
      label: "Campaign Information",
      icon: IconSend,
      route: pathname == "" ? "/" : "/campaign-information/" + pathname,
    },
    {
      label: "Campaign Analytics",
      icon: IconAdjustments,
      route: pathname == "" ? "/" : "/campaign-analytics/" + pathname,
    },
  ];
  const links = data.map((item) => {
    return <LinksGroup {...item} key={item.label} />;
  });

  return (
    <Navbar
      height={800}
      width={{ sm: 300, md: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section className={classes.header}>
        <h2 className="font-bold text-[25px]">InboxPeak</h2>
        <div onClick={toggle} className="cursor-pointer cancel">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
