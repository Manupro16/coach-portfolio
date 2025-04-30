import EditForm, {type FieldConfig, type FieldKind} from "@/app/admin/edit/components/EditForm";
import TextField from "@/app/admin/edit/components/TextField";
import DynamicReactMDEditor from "@/app/admin/edit/components/DynamicReactMDEditor";
import ImageUpload from "@/app/admin/edit/components/imageUpload";
import {WelcomeContent} from "@prisma/client";
import {prisma} from '@/lib/prisma'


//
// 1) Define exactly the shape you edit, based on your Prisma model:
//
type WelcomeInput = Pick<WelcomeContent, 'title' | 'subtitle' | 'contentTitle' | 'contentSubtitle' | 'imageSrc'> & {
    imageFile?: FileList
};


//
// 2) Declare your fields array, each `name` is keyof WelcomeInput
//
const welcomeFields: FieldConfig<WelcomeInput>[] = [
    {kind: 'text', name: 'title', label: 'Main Title'},
    {kind: 'text', name: 'subtitle', label: 'Subtitle'},
    {kind: 'text', name: 'contentTitle', label: 'Section Heading'},
    {kind: 'markdown', name: 'contentSubtitle', label: 'Body Text'},
    {kind: 'image', name: 'imageFile', label: 'Hero Image'},
]

//
// 3) Map each kind to your UI component
//
const COMPONENT_MAP: Record<FieldKind, React.FC<any>> = {
    text: TextField,
    markdown: DynamicReactMDEditor,
    image: ImageUpload,
}


async function EditWelcomeSection() {

    const record = await prisma.welcomeContent.findFirst()
    if (!record) throw new Error('No welcome section found')

    // Pick only the props your form needs
    const initialData: WelcomeInput = {
        title: record.title,
        subtitle: record.subtitle,
        contentTitle: record.contentTitle,
        contentSubtitle: record.contentSubtitle,
        imageSrc: record.imageSrc,
    }


    async function handleSubmit(data: WelcomeInput) {
        console.log('Submitting:', data)
    }


    if (!initialData) {
        return <p className="p-8 text-center">Loading…</p>
    }


    return (
        <EditForm<WelcomeInput>
            fields={welcomeFields}
            componentMap={COMPONENT_MAP}
            initialData={initialData}
            onSubmit={handleSubmit}
            title='Welcome Section'
        />
    )
}


export default EditWelcomeSection;

