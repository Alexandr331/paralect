'use client'

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getMovieDesc } from "@/app/actions";
import { Box, Flex, Group, Image, Loader, Text, Title } from "@mantine/core";
import MovieCardDetail from "@/app/components/MovieCardDetail";
import { IconBackground } from "@tabler/icons-react";
import { IMovieDetail } from "@/app/interfaces";




const Movie = () => {

    const params = useParams()
    const [desc, setDesc] = useState<IMovieDetail>()
    const [trailer, setTrailer] = useState<{results: Array<{key: number, id: number}>}>()
    const [load, setLoad] = useState(true)

    useEffect(() => {
      getMovieDesc(params.id).then(data => {
        setDesc(data?.description)
        setTrailer(data?.video)
        setLoad(false)
        })
    }, [params.id])
    
    return (
        
        load
            ? 
            <Loader/>
            :
            <>
              <Text c={"#9854F6"} size="sm" mb={20}> 
                Movies / {desc?.original_title}
              </Text>
              <MovieCardDetail movie={desc} />
              <Box
                  w={"100%"}
                  style={{borderRadius: '24px'}}
                  p={24}
                  bg={"#fff"}
              >
                  {
                      trailer
                          ?
                          <>
                          <Title mb={16} order={3}>Trailer</Title>
                          <iframe style={{marginBottom: '16px', borderRadius: '10px', border: 'none', aspectRatio: '16/9'}} 
                            width={'100%'} src={`https://www.youtube.com/embed/${trailer.results[trailer.results.length-1].key}?si=${trailer.results[trailer.results.length-1].id}`} 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>
                          </iframe> 
                          <hr style={{marginBottom: '16px'}}/>
                          </>
                          :
                          <Text fw={700} >No available trailers</Text>
                          
                  }
                  <Title mb={16} order={3}>Description</Title>
                  <Text mb={16} fs='md'>
                    {desc?.overview}
                  </Text>
                  <hr />
                  <Title mb={16} order={3}>Production</Title>
                  <Flex
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    wrap="nowrap"
                  >
                    {
                      desc?.production_companies.map(company => {
                        return (
                          <Group key={company.id} mb={12}>
                            {
                              !company.logo_path 
                              ?
                              <IconBackground width={40}/>
                              :
                              <Image w={40} src={`http://media.themoviedb.org/t/p/original${company.logo_path}`} alt="company-poster"/>

                            }
                            <Text size="md" fw={700}>{company.name}</Text>
                          </Group>
                        )
                      })
                    }
                  </Flex>
              </Box>
            </>
        
    )
}

export default Movie