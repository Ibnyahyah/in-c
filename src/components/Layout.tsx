import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderComponent from "./SideBar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="inbox-peak">
      <div className={`side-bar ${showSidebar ? "show" : ""}`}>
        <HeaderComponent toggle={toggleSidebar} />
      </div>
      <main className={"p-4"}>{children}</main>
    </div>
  );
};

export default Layout;
