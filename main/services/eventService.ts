import { lookupHosts } from "$main/helpers/dns";
import { pingHosts } from "$main/helpers/ping";
import { IpcEvent, hosts } from "$shared/constants";

const eventServices = {
  [IpcEvent.Ping]: () => pingHosts(hosts),
  [IpcEvent.Dns]: () => lookupHosts(hosts),
};

export { eventServices };
