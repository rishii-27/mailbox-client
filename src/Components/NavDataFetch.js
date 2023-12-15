import React, { useEffect, useState } from "react";

const NavDataFetch = (url1, url2) => {
  const [inboxCount, setInboxCount] = useState();
  const [sendCount, setSendCount] = useState();

  useEffect(() => {
    const fetchInbox = async () => {
      const response1 = await fetch(url1, {
        method: "GET",
      });
      const response2 = await fetch(url2, {
        method: "GET",
      });

      const data1 = await response1.json();
      const data2 = await response2.json();

      const inboxCount = Object.keys(data1).length || 0;
      const sentCount = Object.keys(data2).length || 0;

      setInboxCount(inboxCount);
      setSendCount(sentCount);
    };
    fetchInbox();
  }, []);

  return [inboxCount, sendCount];
};

export default NavDataFetch;
