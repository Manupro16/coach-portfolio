import React from 'react';
import {Flex, Grid, Heading, Link, Text} from "@radix-ui/themes";
import {
    InstagramLogoIcon,
    TwitterLogoIcon,
    EnvelopeClosedIcon,
    LinkedInLogoIcon
} from "@radix-ui/react-icons";


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
                    <Text size="3" className="text-gray-400 text-center md:text-left">
                        © 2024 Chuy Vera. All rights reserved.
                    </Text>
                </Flex>
                {/* Social Media Links */}
                <Flex as="div" direction="column" gap="2" align="center">
                    <Heading size="6" className="text-primary">
                        Social Media
                    </Heading>
                    <Flex direction="row" gap="5" className="pt-4">
                        <Link
                            href="https://instagram.com/coachchuyvera"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <InstagramLogoIcon
                                className="h-6 w-6 text-primary hover:text-indigo-400 transition-colors duration-200"/>
                        </Link>
                        <Link
                            href="https://twitter.com/coachchuyvera"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        >
                            <TwitterLogoIcon
                                className="h-6 w-6 text-primary hover:text-indigo-400 transition-colors duration-200"/>
                        </Link>
                        <Link
                            href="https://linkedin.com/in/coachchuyvera"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <LinkedInLogoIcon
                                className="h-6 w-6 text-primary hover:text-indigo-400 transition-colors duration-200"/>
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