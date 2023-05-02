// viewed
if (process.env.NODE_ENV !== "production" && !process.env.NEXT_PUBLIC_NODE_1) {
  throw Error("One base RPC URL is undefined");
}

// available nodes to connect to
export const node = process.env.NEXT_PUBLIC_NODE_1!;

const getNodeUrl = () => {
  // Use custom node if available (both for development and production)
  
  if (process.env.NEXT_PUBLIC_NODE_PRODUCTION) {
    return process.env.NEXT_PUBLIC_NODE_PRODUCTION;
  }
  return node;
};

export default getNodeUrl;
