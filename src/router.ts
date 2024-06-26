import { AutoRouter, createResponse } from "itty-router";
import { config } from "./mud.config.js";
import { fetchRecords } from "./fetchRecords.js";
// import { getRecipes } from "./getRecipes.js";
// import { getMaterials } from "./getMaterials.js";
import { getRankings } from "./getRankings.js";
import { getNames } from "./getNames.js";

const router = AutoRouter({
  format: createResponse("application/json; charset=utf-8", (data) =>
    JSON.stringify(
      data,
      (key: string, value: any) =>
        typeof value === "bigint" ? value.toString() : value,
      2
    )
  ),
});

router.get("/", () => ({ message: "Have you eaten your $BUGS today?" }));

router.get("/rankings", async () => {
  return await getRankings();
});

router.get("/names", async () => {
  return await getNames();
});

// router.get("/orders", async () => {
//   const materials = await getMaterials();
//   const { records, blockNumber } = await fetchRecords([
//     config.tables.Order,
//     config.tables.CompletedPlayers,
//   ]);

//   const orders = records
//     .filter((record) => record.table.tableId === config.tables.Order.tableId)
//     .map((record) => {
//       const order = record.fields;

//       const completed = records.find(
//         (r) =>
//           r.table.tableId === config.tables.CompletedPlayers.tableId &&
//           r.fields.orderId === record.fields.orderId
//       )?.fields;

//       return {
//         ...order,
//         orderNumber: parseInt(order.orderId.replace(/^0x/, ""), 16),
//         material: materials.find(
//           (material) => material.materialId === order.materialId
//         ),
//         completed: completed?.count,
//         remaining: completed
//           ? Math.max(0, order.maxPlayers - completed.count)
//           : undefined,
//       };
//     })
//     .filter(
//       (order) => order.remaining > 0 && order.expirationBlock > blockNumber
//     );

//   return orders;
// });

// router.get("/materials", async () => {
//   return await getMaterials();
// });

// router.get("/recipes", async () => {
//   return await getRecipes();
// });

export default router;

// npm install -g bun