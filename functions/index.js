const functions = require("firebase-functions");
const admin = require("firebase-admin");
const typesense = require("./typesense");
admin.initializeApp();

const db = admin.firestore();

// exports.onUserCreate = functions.firestore
//   .document("users/{userId}")
//   .onCreate(async (snap, context) => {
//     const values = snap.data();

//     await db.collection("logging").add({
//       desciption: `Email was send to user with username:${values.first_name}`,
//     });
//   });

exports.onDocCreate = functions.firestore
  .document("TTMDocs/{Doc_name}/docSections/{Section_name}")
  .onCreate(async (snap, context) => {
    const values = snap.data();

    let documentShortenToTweet = {
      title: "Traffic cones and bollards",
      sectionRef: "Section 5.4.1",
      bookRef:
        "Quensland Guides to Temporary Traffic Management, part 3: Static Worksites",
      bodyText: `Difference
        Replace dot points 6 and 7:
        • Small traffic cones (up to 500 mm high) may be used in built-up areas and open roads
        including footpaths, shared paths and bicycle paths where the speed is 70 km/h or less.
        • Standard traffic cones (700 mm high) shall be used for all other road applications where the
        speed is more than 70 km/h. Higher cones are also available.
        with:
        • Guidance on traffic cones and bollard sizes is given in AS 1742.3: Clause 4.11.1.`,
      shortDescription:
        "This legislation, numbered 5.4.1, focuses on traffic cones and bollards. It replaces two dot points with guidance from AS 1742.3: Clause 4.11.1 regarding traffic cone and bollard sizes.",
      synonyms: [],
      date: "March 2022",
    };

    console.log(
      typesense
        .collections("Doc_Search_temp2")
        .documents()
        .create(documentShortenToTweet)
    );
  });
