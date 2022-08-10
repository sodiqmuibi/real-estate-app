import Link from "next/link"
import {Menu, MenuButton, MenuItem, Flex, Box, Spacer, IconButton, MenuList} from '@chakra-ui/react'
import {FcMenu, FcHome, FcAbout, FcSearch} from 'react-icons/fc'
import { BsSearch } from 'react-icons/bs'
import {FiKey} from 'react-icons/fi'

const Navbar = () => (
    <Flex p="2" borderBottom="1px" borderColor="gray.100" marginLeft="50px" marginRight="50px">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold">
            <Link href="/" paddingLeft="2">Realtor</Link>
        </Box>
        <Spacer />
        <Box>
            <Menu>
                <MenuButton as={IconButton} icon={<FcMenu />} variant="outlined" color="red.400"/>
                <MenuList>
                    <Link href="/" passHref>
                        <MenuItem icon={<FcHome />}>Home</MenuItem>
                    </Link>
                    <Link href="/search" passHref>
                        <MenuItem icon={<FcSearch />}>Search</MenuItem>
                    </Link>
                    <Link href="/search?purpose=for-sale" passHref>
                        <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
                    </Link>
                    <Link href="/search?purpose=for-rent" passHref>
                        <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </Box>
    </Flex>
)
export default Navbar