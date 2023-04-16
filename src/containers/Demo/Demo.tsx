import { useCallback, useState } from "react";
import { Button, Card } from "antd";

import { IpcEvent, hosts } from "$shared/constants";

type PingItem = {
  time: number;
  alive: boolean;
  host: string;
};

type DnsItem = {
  host: string;
  ip: string;
};

function Demo() {
  const [loading, setLoading] = useState({ dns: false, ping: false });
  const [pingData, setPingData] = useState<PingItem[]>([]);
  const [dnsData, setDnsData] = useState<DnsItem[]>([]);
  const getPingData = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, ping: true }));
      const data = await window.electron.sendToMain<PingItem[]>(IpcEvent.Ping);
      setPingData(data);
    } finally {
      setLoading((prev) => ({ ...prev, ping: false }));
    }
  }, []);

  const getDnsData = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, dns: true }));
      const data = await window.electron.sendToMain<DnsItem[]>(IpcEvent.Dns);
      console.log("data", data);
      setDnsData(data);
    } finally {
      setLoading((prev) => ({ ...prev, dns: false }));
    }
  }, []);

  return (
    <section>
      <Card title="当前解析的域名" style={{ width: 400 }}>
        {hosts.map((host) => (
          <p key={host}>host: {host}</p>
        ))}
      </Card>
      <Card
        title="ping data"
        style={{ width: 400 }}
        extra={
          <Button type="primary" loading={loading.ping} onClick={getPingData}>
            Start
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
      <Card
        title="Dns data"
        style={{ width: 400 }}
        extra={
          <Button type="primary" loading={loading.dns} onClick={getDnsData}>
            Start
          </Button>
        }
      >
        {dnsData.map((item) => (
          <p key={item.host}>
            host: {item.host} - ip: {item.ip}
          </p>
        ))}
      </Card>
    </section>
  );
}

export default Demo;
