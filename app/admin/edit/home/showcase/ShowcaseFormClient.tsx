'use client'

import {showcaseSchema, zodShowcaseInput} from "@/app/admin/edit/home/showcase/schema";
import EditForm, {FieldConfig, FieldKind} from "@/app/admin/edit/components/EditForm";
import React from "react";
import {ImageRenderer, MarkdownRenderer, TextFieldRenderer, VideoRenderer} from "@/app/admin/edit/components/renderers";

import {zodResolver} from "@hookform/resolvers/zod";


const showcaseField: FieldConfig<zodShowcaseInput>[] = [
    {kind: 'text', name: 'team', label: 'Team Name'},
    {kind: 'text', name: 'season', label: 'Season Year'},
    {kind: 'text', name: 'description', label: 'Description of the game'},
    {kind: 'video', name: 'videoFile', label: 'Video Source?'},
]

const COMPONENT_MAP: Record<FieldKind, React.FC<any>> = {
    text: TextFieldRenderer,
    markdown: MarkdownRenderer,
    image: ImageRenderer,
    video: VideoRenderer,
}


interface Props {
    initialData: zodShowcaseInput
    onSubmitAction: (values: zodShowcaseInput) => Promise<void>
}

function ShowcaseFormClient({ initialData, onSubmitAction }: Props) {
    return (
        <EditForm<zodShowcaseInput>
            fields={showcaseField}
            componentMap={COMPONENT_MAP}
            initialData={initialData}
            onSubmit={onSubmitAction}
            title="Edit Showcase Section"
            resolver={zodResolver(showcaseSchema)}
        />
    )
}

export default ShowcaseFormClient;