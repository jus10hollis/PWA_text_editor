import { openDB } from "idb";

const initdb = async () =>
  openDB("content", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("content")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("content", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (err, content) => {
  const jateDb = await openDB("content", 1);
  const txt = jateDb.transaction("content", "readwrite");
  const store = txt.objectStore("content");
  const request = store.add({ content: content });
  const result = await request;
  if (err) {
    console.error("putDb not implemented");
  }
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (err) => {
  const jateDb = await openDB("content", 1);
  const txt = jateDb.transaction("content", "readwrite");
  const store = txt.objectStore("content");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  if (err) {
    console.error("getDb not implemented");
  }
  return result;
};

initdb();
