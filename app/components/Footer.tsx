import React from 'react';
import {Flex, Grid, Heading, Link, Text} from "@radix-ui/themes";
import {InstagramLogoIcon, TwitterLogoIcon, FontFamilyIcon, EnvelopeClosedIcon} from "@radix-ui/react-icons";


const Footer: React.FC = () => {
    return (
        <footer className="nav-footer-background border-t p-4 sm:p-6 md:p-10">
            <Grid as="div" columns={{initial: "1", md: "repeat(auto-fit, minmax(240px, 1fr))"}}
                  gap={{initial: "8", md: "6"}}>
                {/* Brand Information */}
                <Flex as="div" direction="column" gap="2" align={{initial: "center", md: "start"}}>
                    <Heading size="6" className="text-primary">
                        Chuy Vera
                    </Heading>
                    <Text size="4" className="text-textMuted">
                        Professional Football Coach
                    </Text>
                    <Text size="3" className="text-gray-500">
                        © 2024 Chuy Vera. All rights reserved.
                    </Text>
                </Flex>
                 {/* Social Media Links */}
                <Flex as="div" direction="column" gap="2" align="center">
                    <Heading size="6" className="text-primary">
                        Social Media
                    </Heading>
                    <Flex direction="row" gap="5" className="pt-4">
                        <Link href="https://instagram.com" title="Instagram">
                            <InstagramLogoIcon className="h-6 w-6 text-primary hover:text-primaryDark"/>
                        </Link>
                        <Link href="https://x.com" title="twitter or x">
                            <TwitterLogoIcon className="h-6 w-6 text-primary hover:text-primaryDark"/>
                        </Link>
                        <Link href="https://facebook.com" title="facebook">
                            <FontFamilyIcon className="h-6 w-6 text-primary hover:text-primaryDark"/>
                        </Link>
                    </Flex>
                </Flex>
                {/* Contact Information */}
                <Flex as="div" direction="column" align="center">
                    <Heading size="6" className="text-primary">
                        Contact Information
                    </Heading>
                    <Flex direction="row" align="center" className="pt-4">
                        <EnvelopeClosedIcon className="mr-2 text-primary"/>
                        <Text size="4" className="text-textMuted">
                            <a href="mailto:verajesus15@hotmail.com" className="hover:text-primaryDark">
                                verajesus15@hotmail.com
                            </a>
                        </Text>
                    </Flex>
                </Flex>
            </Grid>
        </footer>
    );
};

export default Footer;