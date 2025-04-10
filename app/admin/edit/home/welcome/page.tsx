

import {TopWave, BottomWave} from '@/app/components/svgWaves';
import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Link,
    Text,
    Switch,
    TextField,
    RadioGroup,
    AlertDialog
} from '@radix-ui/themes';
import dynamic from "next/dynamic";



function EditWelcomeSection() {

    const isLoading = false;
    const isEditMode = true;
    const colorMode = 'dark';

    return (
        <Box
            className={`shadow-md rounded-lg p-8 w-full max-w-3xl ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-700'}`}>
            <Flex as="div" justify="between">
                <Heading as="h2" size="4" className="text-2xl font-semibold text-green-500 mb-4">
                    Edit Welcome Section
                </Heading>
            </Flex>
            <form className="space-y-6">
                {/* Title Field */}
                <Box>
                    <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                        Title
                    </Heading>
                    <TextField.Root
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                            colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                    />
                </Box>
                {/* SubTitle Field */}
                <Box>
                    <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                        Sub Title
                    </Heading>
                    <TextField.Root
                        id="SubTitle"
                        type="text"
                        placeholder="Enter SubTitle"
                        className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                            colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                    />
                </Box>

                {/* Image Input Fields */}
                    <Box>
                        <Heading as="h3" size="4" className="font-bold text-primary mb-4">
                            Upload Image
                        </Heading>
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-200">
                            Choose an image to upload
                        </label>
                    </Box>
                   {/* content Title Field */}
                <Box>
                    <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                        Content Title
                    </Heading>
                    <TextField.Root
                        id="contentTitle"
                        type="text"
                        placeholder="Enter SubTitle"
                        className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                            colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                    />
                </Box>
            </form>
        </Box>
    )


}


export default EditWelcomeSection;