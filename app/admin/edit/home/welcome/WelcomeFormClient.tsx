'use client'

import EditForm, {type FieldConfig, type FieldKind} from "@/app/admin/edit/components/EditForm";
import { TextFieldRenderer, MarkdownRenderer, ImageRenderer, type RendererProps } from '@/app/admin/edit/components/renderers'
import React from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { welcomeSchema, zodWelcomeInput } from './schema'



const welcomeFields: FieldConfig<zodWelcomeInput>[] = [
    {kind: 'text', name: 'title', label: 'Main Title'},
    {kind: 'text', name: 'subtitle', label: 'Subtitle'},
    {kind: 'text', name: 'contentTitle', label: 'Section Heading'},
    {kind: 'markdown', name: 'contentSubtitle', label: 'Section Body Text'},
    {kind: 'text', name: 'imageTitle', label: 'Image Alt Text'},  // new
    {kind: 'image', name: 'imageFile', label: 'Hero Image'},
]

type ShowcaseRenderer = React.FC<RendererProps<zodWelcomeInput>>

const COMPONENT_MAP: Record<FieldKind, ShowcaseRenderer> = {
    text: TextFieldRenderer,
    markdown: MarkdownRenderer,
    image: ImageRenderer,
    video: () => null,
    date: () => null,
}


interface Props {
    initialData: zodWelcomeInput
    onSubmitAction: (values: zodWelcomeInput) => Promise<void>
}


function WelcomeFormClient({initialData, onSubmitAction}: Props) {
    return (
            <EditForm<zodWelcomeInput>
            fields={welcomeFields}
            componentMap={COMPONENT_MAP}
            initialData={initialData}
            onSubmit={onSubmitAction}
            title="Edit Welcome Section"
            resolver={zodResolver(welcomeSchema)}
        />
    )
}


export default WelcomeFormClient