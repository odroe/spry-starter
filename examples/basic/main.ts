import { StorageBox } from "storage-box";

const box = new StorageBox("My Box");

async function main() {
  // Write a data to the box.
  await box.set("who", "Odroe!!!");

  // Read the data from the box.
  const who = await box.get<string>("who");
  console.log(who);

  // Delete the data from the box.
  await box.remove("who");
  const deletedWho = await box.get("who");
  console.log(`Deleted who: ${deletedWho}`);
}

main();
