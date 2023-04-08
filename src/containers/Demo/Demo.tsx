import { useCallback, useState } from "react";
import { Button, Card } from "antd";

import { IpcEvent } from "$shared/constants";

type PingData = {
  time: number;
  alive: boolean;
  host: string;
};

function Demo() {
  const [pingLoading, setPingLoading] = useState(false);
  const [pingData, setPingData] = useState<PingData[]>([]);
  const sendMessage = useCallback(async () => {
    try {
      setPingLoading(true);
      const data = await window.electron.sendToMain<PingData[]>(IpcEvent.Ping);
      console.log("xxx", data);
      setPingData(data);
    } finally {
      setPingLoading(false);
    }
  }, []);

  return (
    <section>
      <Card
        title="ping data"
        style={{ width: 400 }}
        extra={
          <Button type="primary" loading={pingLoading} onClick={sendMessage}>
            ping
          </Button>
        }
      >
        {pingData.map((item) => (
          <p key={item.host}>
            host: {item.host} - alive: {String(item.alive)} - time[ms]:
            {item.time}
          </p>
        ))}
      </Card>
    </section>
  );
}

export default Demo;
