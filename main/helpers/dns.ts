import dns from "dns";

export function getCurrentIps() {
  const servers = dns.getServers();
  return servers;
}

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
