import dns from "dns";
import { internalIpV4 } from "internal-ip";
import { publicIpv4 } from "public-ip";

import os from "os";

export async function getCurrentIps() {
  const ips = await Promise.all([internalIpV4(), publicIpv4()]);
  return {
    internalIpV4: ips[0],
    publicIpv4: ips[1],
  };
}

export function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}
console.log(getIPAddress()); // 本地ip
export function lookByHost(host: string) {
  return new Promise((resolve, reject) => {
    dns.lookup(host, (err, ip) => {
      if (err) {
        reject(err);
      }
      resolve({
        host,
        ip,
      });
    });
  });
}

export function lookupHosts(hosts: string[]) {
  return Promise.all(hosts.map((host) => lookByHost(host)));
}

getCurrentIps().then((ips) => {
  console.log("inner ips", ips);
});
