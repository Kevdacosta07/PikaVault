import EditUserComp from "@/components/Admin/utilisateurs/editUser";


export default async function EditUserPage({params}: {params: Promise<{ id: string }>}) {

    const { id } = await params;

    return (
        <EditUserComp id={id} />
    );
}
