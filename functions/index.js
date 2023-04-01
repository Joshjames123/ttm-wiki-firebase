const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const typesense = require("./typesense");
admin.initializeApp();

const db = admin.firestore();

var database = admin.database();

//Test deploy
// exports.onUserCreate = functions.firestore
//   .document("users/{userId}")
//   .onCreate(async (snap, context) => {
//     const values = snap.data();

//     await db.collection("logging").add({
//       desciption: `Email was send to user with username:${values.first_name}`,
//     });
//   });

//Transfer data from firestor DB to Realtime DB

//Part 1 Successful
// exports.transferData = functions.firestore
//   .document("TTMDocs/{docId}")
//   .onCreate((snapshot, context) => {
//     const newData = snapshot.data();
//     const regionName = newData.regionName;
//     const region = newData.region;
//     const countryName = newData.countryName;
//     const country = newData.country;
//     if (!country && countryName) {
//       // If countryName is not provided, use country instead
//       country = countryName;
//       countryName = null;
//     }
//     if (!region && regionName) {
//       region = regionName;
//       regionName = null;
//     }
//     const ref = database.ref(
//       "TTMDocsCol/" +
//         country +
//         "/" +
//         (countryName ? countryName + "/" : "") +
//         region +
//         "/" +
//         (regionName ? regionName + "/" : "") +
//         "/" +
//         context.params.docId
//     );
//     return ref.set(newData);
//   });

//Part 2 Inprogress
// exports.transferData = functions.firestore
//   .document("TTMDocs/{docId}")
//   .onCreate(async (snapshot, context) => {
//     const newData = snapshot.data();
//     const regionName = newData.regionName;
//     const region = newData.region;
//     const countryName = newData.countryName;
//     let country = newData.country; // declare country as let to modify it later
//     if (!country && countryName) {
//       // If countryName is not provided, use country instead
//       country = countryName;
//       countryName = null;
//     }
//     let docData = {}; // initialize empty object to store collection data
//     if (newData.docRef) {
//       const docRef = newData.docRef;
//       const docSnapshot = await docRef.get();
//       docData = docSnapshot.data();
//     }
//     if (!region && regionName) {
//       region = regionName;
//       regionName = null;
//     }
//     const ref = database.ref(
//       "TTMDocsCol/" +
//         country +
//         "/" +
//         (countryName ? countryName + "/" : "") +
//         region +
//         "/" +
//         (regionName ? regionName + "/" : "") +
//         "/" +
//         context.params.docId
//     );
//     const subcollectionRef = ref.child("subcollection");
//     const newDocRef = subcollectionRef.push();
//     const subcollectionData = {
//       nameSample: "Sample Collection",
//       ...docData, // add collection data to subcollection data object
//     };
//     return newDocRef.set({
//       ...subcollectionData,
//       ...newData, // add newData properties at the same level as subcollectionData
//     });
//   });

//This part is working//////////////////////////////////////////////
// exports.transferData = functions.firestore
//   .document("TTMDocs/{docId}")
//   .onCreate(async (snapshot, context) => {
//     const newData = snapshot.data();
//     const regionName = newData.regionName;
//     const region = newData.region;
//     const countryName = newData.countryName;
//     let country = newData.country; // declare country as let to modify it later
//     if (!country && countryName) {
//       // If countryName is not provided, use country instead
//       country = countryName;
//       countryName = null;
//     }
//     let docData = {}; // initialize empty object to store collection data
//     if (newData.docRef) {
//       const docRef = newData.docRef;
//       const docSnapshot = await docRef.get();
//       docData = docSnapshot.data();
//     }
//     if (!region && regionName) {
//       region = regionName;
//       regionName = null;
//     }
//     const ref = database.ref(
//       "TTMDocsCol/" +
//         country +
//         "/" +
//         (countryName ? countryName + "/" : "") +
//         region +
//         "/" +
//         (regionName ? regionName + "/" : "") +
//         "/" +
//         context.params.docId
//     );
//     // const subcollectionRef = ref.child("subcollection");
//     // const newDocRef = subcollectionRef.push();
//     const subcollectionData = {
//       nameSample: "Sample Collection",
//       ...docData, // add collection data to subcollection data object
//     };
//     const combinedData = {
//       children: {
//         ...subcollectionData, // add subcollectionData nested within subcollection key
//       },
//       ...newData, // add newData properties at the top level
//     };
//     return ref.set(combinedData);
//   });

// exports.transferData = functions.firestore
//   .document("TTMDocs/{docId}")
//   .onCreate(async (snapshot, context) => {
//     const newData = snapshot.data();
//     const regionName = newData.regionName;
//     const region = newData.region;
//     const countryName = newData.countryName;
//     let country = newData.country; // declare country as let to modify it later
//     if (!country && countryName) {
//       // If countryName is not provided, use country instead
//       country = countryName;
//       countryName = null;
//     }
//     let docData = {}; // initialize empty object to store collection data
//     if (newData.docRef) {
//       const docRef = newData.docRef;
//       const docSnapshot = await docRef.get();
//       docData = docSnapshot.data();
//     }
//     if (!region && regionName) {
//       region = regionName;
//       regionName = null;
//     }
//     const ref = database.ref(
//       "TTMDocsCol/" +
//         country +
//         "/" +
//         (countryName ? countryName + "/" : "") +
//         region +
//         "/" +
//         (regionName ? regionName + "/" : "") +
//         "/" +
//         context.params.docId
//     );

//     // Check if parentId exists in newData
//     if (newData.parentId) {
//       // Query the collection with the same docId and parentId
//       const querySnapshot = await firestore
//         .collection("TTMDocs")
//         .where("docId", "==", newData.docId)
//         .where("parentId", "==", newData.parentId)
//         .get();

//       // If there is a document with the same docId and parentId
//       if (!querySnapshot.empty) {
//         // Get the first document in the query snapshot
//         const doc = querySnapshot.docs[0];

//         // Get the subcollection from the existing document and add it to the newData
//         const subcollectionRef = doc.ref.collection("subcollection");
//         const subcollectionQuerySnapshot = await subcollectionRef.get();
//         const subcollectionDocs = subcollectionQuerySnapshot.docs.map(
//           (subcollectionDoc) => subcollectionDoc.data()
//         );
//         newData.subcollection = subcollectionDocs;
//       }
//     }

//     // const subcollectionRef = ref.child("subcollection");
//     // const newDocRef = subcollectionRef.push();
//     const subcollectionData = {
//       nameSample: "Sample Collection9",
//       ...docData, // add collection data to subcollection data object
//     };
//     const combinedData = {
//       children: {
//         ...subcollectionData, // add subcollectionData nested within subcollection key
//       },
//       ...newData, // add newData properties at the top level
//     };
//     return ref.set(combinedData);
//   });

// adding the value of the new document in the children collection
// exports.transferData = functions.firestore
//   .document("TTMDocs/{docId}")
//   .onCreate(async (snapshot, context) => {
//     const newData = snapshot.data();
//     const parentId = newData.parentId;
//     const docId = context.params.docId;
//     if (parentId && parentId === docId) {
//       const parentRef = database.ref("TTMDocsCol/" + parentId);
//       const parentSnapshot = await parentRef.once("value");
//       const parentData = parentSnapshot.val();
//       const children = parentData.children || {}; // get existing children or initialize an empty object
//       const childData = {
//         nameSample: "Sample Collection",
//         ...newData, // add newData properties at the top level
//       };
//       children[docId] = childData; // add childData to children object using docId as key
//       return parentRef.update({ children });
//     } else {
//       const regionName = newData.regionName;
//       const region = newData.region;
//       const countryName = newData.countryName;
//       let country = newData.country; // declare country as let to modify it later
//       if (!country && countryName) {
//         // If countryName is not provided, use country instead
//         country = countryName;
//         countryName = null;
//       }
//       let docData = {}; // initialize empty object to store collection data
//       if (newData.docRef) {
//         const docRef = newData.docRef;
//         const docSnapshot = await docRef.get();
//         docData = docSnapshot.data();
//       }
//       if (!region && regionName) {
//         region = regionName;
//         regionName = null;
//       }
//       const ref = database.ref(
//         "TTMDocsCol/" +
//           country +
//           "/" +
//           (countryName ? countryName + "/" : "") +
//           region +
//           "/" +
//           (regionName ? regionName + "/" : "") +
//           "/" +
//           docId
//       );
//       // const subcollectionRef = ref.child("subcollection");
//       // const newDocRef = subcollectionRef.push();
//       const subcollectionData = {
//         nameSample: "Sample Collection1",
//         ...docData, // add collection data to subcollection data object
//       };
//       const combinedData = {
//         children: {
//           ...subcollectionData, // add subcollectionData nested within subcollection key
//         },
//         ...newData, // add newData properties at the top level
//       };
//       return ref.set(combinedData);
//     }
//   });

exports.transferData = functions.firestore
  .document("TTMDocs/{docId}")
  .onCreate(async (snapshot, context) => {
    const newData = snapshot.data();
    const regionName = newData.regionName;
    const region = newData.region;
    const countryName = newData.countryName;
    let country = newData.country; // declare country as let to modify it later
    if (!country && countryName) {
      // If countryName is not provided, use country instead
      country = countryName;
      countryName = null;
    }
    let docData = {}; // initialize empty object to store collection data
    if (newData.docRef) {
      const docRef = newData.docRef;
      const docSnapshot = await docRef.get();
      docData = docSnapshot.data();
    }
    if (!region && regionName) {
      region = regionName;
      regionName = null;
    }
    const ref = database.ref(
      "TTMDocsCol/" +
        country +
        "/" +
        (countryName ? countryName + "/" : "") +
        region +
        "/" +
        (regionName ? regionName + "/" : "") +
        "/" +
        context.params.docId
    );
    const parentId = newData.parentId;
    if (parentId && parentId === context.params.docId) {
      // If parentId matches current docId, add new document to children
      const parentRef = ref.parent;
      const parentSnapshot = await parentRef.once("value");
      const parentData = parentSnapshot.val();
      if (parentData && parentData.children) {
        const children = parentData.children;
        const childId = context.params.docId;
        const subcollectionData = {
          nameSample: "Sample Collection",
          ...docData, // add collection data to subcollection data object
        };
        children[childId] = {
          ...subcollectionData, // add subcollectionData nested within subcollection key
          ...newData, // add newData properties at the top level
        };
        await parentRef.child("children").set(children);
      }
    } else {
      // If parentId doesn't match current docId, add new document to current docId
      const subcollectionData = {
        nameSample: "Sample Collection",
        ...docData, // add collection data to subcollection data object
      };
      const combinedData = {
        children: {
          ...subcollectionData, // add subcollectionData nested within subcollection key
        },
        ...newData, // add newData properties at the top level
      };
      await ref.set(combinedData);
    }
  });

///////////////////////////////////////////////////////////////
// exports.onDocCreate = functions.firestore
//   .document("TTMDocs/{Doc_name}")
//   .onCreate(async (snap, context) => {
//     const values = snap.data();

// connect to firebase realtime database here
// const db = admin.firebase.realtime

// if (values.parent == "root") {
// document is a root doc example: root > QGTTM

// code from https://www.youtube.com/watch?v=bpI3Bbhlcas
// his github https://gist.github.com/rotolonico/0e12c764c25e058b3bc75156cbe66b65
// database.ref("serchDocs/Australia/Queensland/").set({
//   name: values.name,
// });
// } else {
// document is a sub doc example: root > QGTTM > QGTTM pt 1

// example ref('serchDocs/Australia/Queensland/QGTTM/')
// database.ref(`serchDocs/Australia/Queensland/${values.path}`).set({
// name: values.name,
// });
// }
// });

// exports.onDocCreate = functions.firestore
//   .document("TTMDocs/{Doc_name}/docSections/{Section_name}")
//   .onCreate(async (snap, context) => {
//     const values = snap.data();

//     let documentShortenToTweet = {
//       title: values.title,
//       sectionRef: "Section 5.4.1",
//       bookRef:
//         "Quensland Guides to Temporary Traffic Management, part 3: Static Worksites",
//       bodyText: `Difference
//         Replace dot points 6 and 7:
//         • Small traffic cones (up to 500 mm high) may be used in built-up areas and open roads
//         including footpaths, shared paths and bicycle paths where the speed is 70 km/h or less.
//         • Standard traffic cones (700 mm high) shall be used for all other road applications where the
//         speed is more than 70 km/h. Higher cones are also available.
//         with:
//         • Guidance on traffic cones and bollard sizes is given in AS 1742.3: Clause 4.11.1.`,
//       shortDescription:
//         "This legislation, numbered 5.4.1, focuses on traffic cones and bollards. It replaces two dot points with guidance from AS 1742.3: Clause 4.11.1 regarding traffic cone and bollard sizes.",
//       synonyms: [],
//       date: "March 2022",
//     };

//     console.log(
//       typesense
//         .collections("Doc_Search_temp2")
//         .documents()
//         .create(documentShortenToTweet)
//     );
//   });
