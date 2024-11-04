import {PrismaClient} from "@prisma/client";
import exp from "constants";
const prisma = new PrismaClient({
    log : ["error", "query"],
});

export default prisma;