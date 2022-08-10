import { Box, Flex, Spacer, Text, Avatar } from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'
import { fetchApi, baseUrl } from '../../utilities/fetchApi'
import ImageScrollbar from '../../components/ImageScrollbar'

const PropertyDetails = ({propDetails}) => {
    console.log(propDetails)
    return (
        <Box maxWidth="1000px" margin="auto" p="4">
            {propDetails.photos && <ImageScrollbar data={propDetails.photos}/>}
            <Box w="full" p="6">
                <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400">{propDetails.isVerified && <GoVerified />}</Box>
                        <Text fontWeight="bold" fontSize="lg">#{millify(propDetails.price)}{propDetails.rentFrequency && `/${propDetails.rentFrequency}`}</Text>
                    </Flex>
                    <Box>
                        <Avatar size="sm" src={propDetails.agency?.logo?.url}></Avatar>
                    </Box>
                </Flex>
                <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                    {propDetails.rooms} <FaBed /> | {propDetails.baths} <FaBath /> | {millify(propDetails.area)} sqft <BsGridFill />
                </Flex>
                <Box marginTop="2">
                    <Text fontSize="lg" fontWeight="bold" marginBottom="2">
                        {propDetails.title}
                    </Text>
                    <Text lineHeight="2" color="gray.600">{propDetails.description}</Text>
                </Box>
                <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.400">
                        <Text>Type</Text>
                        <Text fontWeight="bold">{propDetails.type}</Text>
                    </Flex>
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.400">
                        <Text>Purpose</Text>
                        <Text fontWeight="bold">{propDetails.purpose}</Text>
                    </Flex>
                    {propDetails.furninishingStatus && (
                        <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.400">
                            <Text>Furnishing Status</Text>
                            <Text fontWeight="bold">{propDetails.furninishingStatus}</Text>
                        </Flex>
                    )}
                </Flex>
                <Box>
                    {propDetails.amenities.length  && (<Text fontWeight="bold" fontSize="2xl" marginTop="2">Amenities</Text>)}
                    <Flex flexWrap='wrap'>
                        {propDetails.amenities?.map((item) => (
                            item?.amenities?.map((amenity) => (
                                <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                                    {amenity.text}
                                </Text>
                            ))
                        ))}
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

export default PropertyDetails

export async function getServerSideProps({params: {id}}) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)
    return {
        props: {
            propDetails: data
        }
    }
}