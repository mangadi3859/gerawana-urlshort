import Prisma from "@/lib/prisma";
import { redirect, useParams } from "next/navigation";

export default async function RedirectPage({ params }: { params: { id: string } }) {
    let { id } = params;
    let short = await Prisma.shortLink.findFirst({ where: { link: id } });
    if (!short) return redirect("/");

    await Prisma.visit.create({ data: { shortLinkId: short.id } });
    redirect(short.redirect);
}
