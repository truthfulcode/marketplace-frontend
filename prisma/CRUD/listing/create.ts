import { Listing, ListingCategory } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { getBalance, isAccountCustomer } from "../user/read";
import { lockBalance } from "../user/update";

export default async function createListing(obj: Listing) {
  const { customerId, description, files, price, title, category, status } =
    obj;
  /// @dev check that username | email is not already taken
  let keys = Object.keys(ListingCategory);
  const balance = await getBalance(customerId);
  if (!keys.includes(category)) throw Error("invalid category");
  if (status != "ACTIVE" && status != "DRAFT") throw Error("invalid status");
  if (!(await isAccountCustomer(customerId)))
  throw Error("only valid customer allowed");
  if (price < 5e6) throw Error("Price must be greater or equal to 5$!");
  if ( (balance ? balance : 0) < price) throw Error("Insufficient balance!"); 
  if (title.split(" ").length < 5)
    throw Error("title must be greater or equal to 5 words");
  await lockBalance(customerId,price);
  return await prisma.listing.create({
    data: {
      customerId: customerId,
      price: price,
      title: title,
      description: description,
      files: files,
      status: status,
      category: category,
    },
  });
}
