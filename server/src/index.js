import app from "./app.js";

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/create-organisation/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, description, logoUrl } = req.body;
//   try {
//     const check = await prisma.user.findUnique({
//       where: {
//         id: id,
//         isVerified: true,
//       },
//     });
//     if (check) {
//       const newOrganisation = await prisma.organisation.create({
//         data: {
//           name,
//           description,
//           logoUrl,
//           user: {
//             connect: {
//               id: id,
//             },
//           },
//         },
//       });

//       res.json({
//         flag: true,
//         data: newOrganisation.id,
//       });
//     } else {
//       res.json({
//         flag: false,
//         error: "User is not verified",
//       });
//     }
//   } catch (error) {
//     res.json({
//       status: 500,
//       flag: false,
//     });
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
