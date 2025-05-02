'use client'

import EditForm, {type FieldConfig, type FieldKind} from "@/app/admin/edit/components/EditForm";
import {WelcomeInput} from '@/app/admin/edit/home/welcome/page'
import { TextFieldRenderer, MarkdownRenderer, ImageRenderer } from '@/app/admin/edit/components/renderers'
import React from "react";


//
// 1) Declare your fields array, each `name` is keyof WelcomeInput
//
const welcomeFields: FieldConfig<WelcomeInput>[] = [
    {kind: 'text', name: 'title', label: 'Main Title'},
    {kind: 'text', name: 'subtitle', label: 'Subtitle'},
    {kind: 'text', name: 'contentTitle', label: 'Section Heading'},
    {kind: 'markdown', name: 'contentSubtitle', label: 'Body Text'},
    {kind: 'text', name: 'imageTitle', label: 'Image Alt Text'},  // new
    {kind: 'image', name: 'imageFile', label: 'Hero Image'},
]

//
// 2) Map each kind to your UI component
//
const COMPONENT_MAP: Record<FieldKind, React.FC<any>> = {
    text: TextFieldRenderer,
    markdown: MarkdownRenderer,
    image: ImageRenderer,
}


interface Props {
    initialData: WelcomeInput
    onSubmitAction: (values: WelcomeInput) => Promise<void>
}


function WelcomeFormClient({initialData, onSubmitAction}: Props) {
    return (
            <EditForm<WelcomeInput>
            fields={welcomeFields}
            componentMap={COMPONENT_MAP}
            initialData={initialData}
            onSubmit={onSubmitAction}
            title="Edit Welcome Section"
        />
    )
}


export default WelcomeFormClient