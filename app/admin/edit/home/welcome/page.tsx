import {TopWave, BottomWave} from '@/app/components/svgWaves';
import {Box, Button, Flex, Grid, Heading, Link, Text, Switch, TextField, RadioGroup} from '@radix-ui/themes';



function EditWelcomeSection() {

    const isLoading = false;
    const isEditMode = true;
    const colorMode = 'dark';
    const imageSource = 'URL'; // or 'UPLOAD'


    return (
        <Box as="div" className="bg-gray-900 ">
            {/* Form Header */}
            <Flex as="div" justify="center">
                <Heading as="h2" size="6" className="text-2xl font-semibold  mb-4">
                    Edit Welcome Section
                </Heading>
            </Flex>
            <form>
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
                <Box>
                    <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                        subtitle
                    </Heading>
                    <TextField.Root
                        id="subtitle"
                        type="text"
                        placeholder="Enter subtitle"
                        className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                            colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                    />
                </Box>

                <Box>
                    <Heading as="h3" size="4" className="font-bold text-primary mb-4">
                        Select Image Source
                    </Heading>
                </Box>

                 <Box>
                    <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                        ContentTitle
                    </Heading>
                    <TextField.Root
                        id="ContentTitle"
                        type="text"
                        placeholder="Enter ContentTitle"
                        className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
                            colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                    />
                </Box>

                 <Box>
                    <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                        ContentSubtitle
                    </Heading>
                    <TextField.Root
                        id="ContentSubtitle"
                        type="text"
                        placeholder="Enter ContentSubtitle"
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


// <Box
//     className="bg-gray-900"
// >
//
//     {/* Form Header */}
//     <Flex as="div" justify="center">
//         <Heading as="h2" size="6" className="text-2xl font-semibold  mb-4">
//                     Edit Welcome Section
//         </Heading>
//     </Flex>
//
//     {/* The Form */}
//     <form className="space-y-6" noValidate>
//         {/* Title Field */}
//         <Box>
//             <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
//                 Title
//             </Heading>
//             <input
//                 id="title"
//                 type="text"
//                 placeholder="Enter title"
//                 className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
//                     colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
//                 }`}
//             />
//             <Text as="p" className="text-red-500 mt-2">
//                 {/* Error message placeholder */}
//             </Text>
//         </Box>
//
//         {/* Date Field */}
//         <Box>
//             <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
//                 Date
//             </Heading>
//             <input
//                 id="date"
//                 type="date"
//                 placeholder="Enter date"
//                 className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
//                     colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
//                 }`}
//             />
//             <Text as="p" className="text-red-500 mt-2">
//                 {/* Error message placeholder */}
//             </Text>
//         </Box>
//
//         {/* Image Source Selection */}
//         <Box>
//             <Heading as="h3" size="4" className="font-bold text-primary mb-4">
//                 Select Image Source
//             </Heading>
//             <Flex className="flex flex-row gap-4">
//                 <Flex align="center">
//                     <input type="radio" name="imageSource" value="URL" id="image-url-option" defaultChecked/>
//                     <label htmlFor="image-url-option" className="ml-2 text-gray-200 cursor-pointer">
//                         Use Image URL
//                     </label>
//                 </Flex>
//                 <Flex align="center">
//                     <input type="radio" name="imageSource" value="UPLOAD" id="image-upload-option"/>
//                     <label htmlFor="image-upload-option" className="ml-2 text-gray-200 cursor-pointer">
//                         Upload Image
//                     </label>
//                 </Flex>
//             </Flex>
//             <Text as="p" className="text-red-500 mt-2">
//                 {/* Error message placeholder */}
//             </Text>
//         </Box>
//
//         {/* Conditionally Render Image Input Fields */}
//         {imageSource === 'URL' ? (
//             <Box>
//                 <Heading as="h3" size="4" className="font-bold text-primary mb-4">
//                     Image URL
//                 </Heading>
//                 <input
//                     id="imageUrl"
//                     type="text"
//                     placeholder="Enter image URL"
//                     className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300 ${
//                         colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
//                     }`}
//                 />
//                 <Text as="p" className="text-red-500 mt-2">
//                     {/* Error message placeholder */}
//                 </Text>
//             </Box>
//         ) : (
//             <Box>
//                 <Heading as="h3" size="4" className="font-bold text-primary mb-4">
//                     Upload Image
//                 </Heading>
//                 <label htmlFor="imageFile" className="block text-sm font-medium text-gray-200">
//                     Choose an image to upload
//                 </label>
//                 <input
//                     id="imageFile"
//                     type="file"
//                     accept="image/*"
//                     className={`mt-1 block w-full ${colorMode === 'dark' ? 'text-white' : 'text-gray-700'}`}
//                 />
//                 <Text as="p" className="text-red-500 mt-2">
//                     {/* Error message placeholder */}
//                 </Text>
//             </Box>
//         )}
//
//         {/* Image Preview */}
//         <Box className="mt-4">
//             {/* This is where the image preview component would render */}
//             <div>Image Preview Placeholder</div>
//         </Box>
//
//         {/* Content Field */}
//         <Box>
//             <Flex className="items-center mb-4" justify="between" align="center">
//                 <Heading as="h3" size="4" className="font-bold text-primary mb-2">
//                     Content
//                 </Heading>
//                 <Flex className="flex items-center">
//                     <Text as="span" className="mr-2 text-primary">
//                         Light Mode
//                     </Text>
//                     <Switch id="color-mode-switch"/>
//                     <Text as="span" className="ml-2 text-primary">
//                         Dark Mode
//                     </Text>
//                 </Flex>
//             </Flex>
//             {/* Markdown Editor Placeholder */}
//             <textarea
//                 placeholder="Enter content"
//                 rows={10}
//                 className="mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300"
//             />
//             <Text as="p" className="text-red-500 mt-2">
//                 {/* Error message placeholder */}
//             </Text>
//         </Box>
//
//         {/* Form-Level Error or Success Message */}
//         <Box>
//             <Text as="p" className="mt-4 text-green-500">
//                 {/* Success message placeholder */}
//             </Text>
//             <Text as="p" className="mt-4 text-red-500">
//                 {/* Error message placeholder */}
//             </Text>
//         </Box>
//     </form>
// </Box>