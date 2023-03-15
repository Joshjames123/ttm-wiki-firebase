const Typesense = require("typesense");

let typesense = new Typesense.Client({
  nodes: [
    {
      host: "ts-syd.ttm.wiki",
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: "Gh17YwzVDSUMEKlMGKfpWqpx5Ddg8DO3efzzdN6g4AXdmCEx",
  connectionTimeoutSeconds: 2,
});

export default typesense;
