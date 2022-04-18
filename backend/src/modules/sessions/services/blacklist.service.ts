interface Blacklist {
  authorization?: string;
}

interface BlacklistResponse {
  error?: string;
  status: number;
  authorization?: string;
}

const blacklist = [];

const BlacklistService =  ({authorization}:Blacklist): BlacklistResponse => {
  if(!authorization) {
    return { error: '401 Unauthorized', status: 401 };
  }  
  blacklist.push(authorization);
    return {
      status: 200,
      authorization: "revoked",
    };
}

export default BlacklistService;