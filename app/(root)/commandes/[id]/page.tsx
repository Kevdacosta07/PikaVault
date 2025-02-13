import {prisma} from "@/lib/prisma";
import {requireAuth} from "@/lib/authUtil";
import {redirect} from "next/navigation";
import CommandDetails from "@/components/Commandes/CommandDetails";

type Params = Promise<{ id: string }>

export default async function CommandIdPage(props : { params: Params }) {

    const params = await props.params;
    const id = params.id;

    const session = await requireAuth("/auth/login");

    const order = await prisma.order.findUnique({where: {id: id}});

    if (!order || session.user.admin !== 1 && order.userId !== session.user.id) {redirect(`/commandes}`)}

  return <div>

      <CommandDetails order={order} session={session} />

  </div>;
}