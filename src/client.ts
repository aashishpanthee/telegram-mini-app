import { createThirdwebClient } from 'thirdweb';

const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId,
});

// secret key == MwV72mmUOmCNuUcNAb1tg1YloyK2IJfpnpJwy8s-f4SDbkEQL2ThDHVaJjg_0MuHR7lEGY1d7ajLXVritCcccQ
// client id == 98ddf448df5acd23d772fc3019e85726
