import * as React from 'react'
import {Box, Flex, Heading, Text} from '@radix-ui/themes'
import {Link} from "@radix-ui/themes";
import {FaPencilAlt} from "react-icons/fa";

interface StoryStructureProps {
    title: string
    subtitle?: React.ReactNode
    story?: React.ReactNode
    align?: 'left' | 'center' | 'right'
    size?: 'sm' | 'md' | 'lg'
    showSeparator?: boolean
    accentWidthClass?: string
    accentColorClass?: string
    animate?: boolean
    maxWidthClass?: string
    headingAs?: React.ElementType
    className?: string
    headingProps?: React.ComponentProps<typeof Heading>
    subtitleProps?: React.ComponentProps<typeof Text>
    textProps?: React.ComponentProps<typeof Text>
    containerProps?: React.ComponentProps<typeof Flex>
    children?: React.ReactNode
    isAdmin: boolean
    editHref?: string // NEW: control where the pencil navigates
}

const sizeToHeading: Record<NonNullable<StoryStructureProps['size']>, Parameters<typeof Heading>[0]['size']> = {
    sm: '6',
    md: '7',
    lg: '8',
}

const alignToFlexAlign: Record<'left' | 'center' | 'right', 'start' | 'center' | 'end'> = {
    left: 'start',
    center: 'center',
    right: 'end',
}

const alignToText: Record<'left' | 'center' | 'right', 'left' | 'center' | 'right'> = {
    left: 'left',
    center: 'center',
    right: 'right',
}

export default function StoryStructure({
                                           title,
                                           subtitle,
                                           story,
                                           align = 'center',
                                           size = 'lg',
                                           showSeparator = true,
                                           accentWidthClass = 'w-1/3',
                                           accentColorClass = 'bg-primary',
                                           animate = true,
                                           maxWidthClass = 'max-w-[70ch]',
                                           headingAs = 'h1',
                                           className,
                                           headingProps,
                                           subtitleProps,
                                           textProps,
                                           containerProps,
                                           children,
                                           isAdmin,
                                           editHref,
                                       }: StoryStructureProps) {
    // Advanced: custom children fully override default layout
    if (children) {
        return (
            <Flex direction="column" align={alignToFlexAlign[align]} justify="center"
                  className={className} {...containerProps}>
                {children}
            </Flex>
        )
    }

    return (
        <Flex
            direction="column"
            align={alignToFlexAlign[align]}
            justify="center"
            className={className}
            {...containerProps}
        >
            <Flex as="div" direction="row" align="center" gap="4" justify="center">
                <Heading
                    as={headingAs as any}
                    size={sizeToHeading[size]}
                    className="mb-1 text-primary-foreground"
                    {...headingProps}
                >
                    {title}
                </Heading>
                {isAdmin && editHref && (
                    <Link href={editHref} aria-label={`Edit ${title}`}>
                        <FaPencilAlt
                            className="w-5 h-5 text-primary-foreground hover:text-primary transition-colors mb-2"/>
                    </Link>
                )}
            </Flex>

            {showSeparator && (
                <Box
                    as="span"
                    className={[
                        'block h-[3px]',
                        accentWidthClass,
                        accentColorClass,
                        align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : 'mr-auto',
                        animate ? 'motion-safe:animate-[grow_1.2s_ease-out]' : '',
                    ].join(' ')}
                />
            )}

            {subtitle && (
                <Text
                    as="p"
                    size="4"
                    align={alignToText[align]}
                    className="mt-4 text-secondary-foreground"
                    {...subtitleProps}
                >
                    {subtitle}
                </Text>
            )}

            {story && (
                <Text
                    as="p"
                    align={alignToText[align]}
                    className={[
                        'mt-6 text-balance leading-relaxed',
                        maxWidthClass,
                        align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : 'mr-auto',
                    ].join(' ')}
                    {...textProps}
                >
                    {story}
                </Text>
            )}
        </Flex>
    )
}









