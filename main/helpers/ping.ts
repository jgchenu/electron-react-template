import * as ping from "ping";

export async function pingHosts(hosts: string[]) {
  const promises = hosts.map(async (host) => {
    try {
      const res = await ping.promise.probe(host, {
        timeout: 5,
      });
      return res;
    } catch (error) {
      console.error("ping error", error);
    }
  });
  return Promise.all(promises);
}
