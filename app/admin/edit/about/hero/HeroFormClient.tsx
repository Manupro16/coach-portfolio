'use client'

import EditForm, {type FieldConfig, type FieldKind} from "@/app/admin/edit/components/EditForm";
import { TextFieldRenderer, MarkdownRenderer, ImageRenderer, type RendererProps } from '@/app/admin/edit/components/renderers'
import React from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { heroSchema, type HeroInput, type HeroOutput } from "@/app/admin/edit/about/hero/schema";


const heroFields: FieldConfig<HeroInput>[] = [
    {kind: 'text', name: 'fullName', label: 'Main Title'},
    {kind: 'text', name: 'nickname', label: 'Subtitle'},
    {kind: 'text', name: 'headline', label: 'Section Heading'},
    {kind: 'markdown', name: 'summary', label: 'Section Body Text'},
    {kind: 'image', name: 'images', label: 'Hero Image'},
    {kind: 'image', name: 'images', label: 'Hero Image'},
    {kind: 'image', name: 'images', label: 'Hero Image'},
]

type ShowcaseRenderer = React.FC<RendererProps<HeroInput>>

const COMPONENT_MAP: Record<FieldKind, ShowcaseRenderer> = {
    text: TextFieldRenderer,
    markdown: MarkdownRenderer,
    image: ImageRenderer,
    video: () => null,
    date: () => null,
}


interface Props {
    initialData: HeroInput
    onSubmitAction: (values: HeroOutput) => Promise<void>
}

const heroResolver = zodResolver(heroSchema);

function WelcomeFormClient({initialData, onSubmitAction}: Props) {
    return (
            <EditForm<HeroInput, HeroOutput>
            fields={heroFields}
            componentMap={COMPONENT_MAP}
            initialData={initialData}
            onSubmit={onSubmitAction}
            title="Edit hero Section"
            resolver={heroResolver}
        />
    )
}


export default WelcomeFormClient