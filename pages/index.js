import Link from "next/link"
import Image from "next/image"
import Property from "../components/Property"
import { Flex, Box, Text, Button } from "@chakra-ui/react"
import houseImage from '../public/house.avif'
import { baseUrl, fetchApi } from "../utilities/fetchApi"

const Banner = ({ purpose, title1, title2, desc1, buttonText, linkName, imageUrl, desc2 }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems='center' m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner"/>
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1} <br/>{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1} <br/>{desc2}</Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)
export default function Home({saleProp, rentProp}) {
  return (
    <Box>
      <Banner 
        purpose='RENT A HOME'
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"/>
      <Flex flexWrap='wrap'>
        {rentProp.map((property) => (
          <Property property={property} key={property.id}/>
        ))}
      </Flex>
      <Banner 
        purpose='BUY A HOME'
        title1="Find, Buy and Own your"
        title2="Dream House"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl={houseImage}/>
      <Flex flexWrap="wrap">
        {saleProp.map((property) => (
          <Property property={property} key={property.id}/>
        ))}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      saleProp: propertyForSale?.hits,
      rentProp: propertyForRent?.hits,
    }
  }
}
