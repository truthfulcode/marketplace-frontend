import { Listing } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { isAccountCustomer } from "../user/read";

export default async function createListing(obj: Listing) {
  const { customerId, description, files, price, title } = obj;
  /// @dev check that username | email is not already taken
  if (await isAccountCustomer(customerId))
    throw Error("only valid customer allowed");
  if (price < 5) throw Error("Price must be greater or equal to 5$!");
  if (title.split(" ").length < 5)
    throw Error("title must be greater or equal to 5 words");
  await prisma.listing.create({
    data:{
        customerId:customerId,
        price:price,
        title:title,
        description:description,
        files:files,
    }
  })
}
