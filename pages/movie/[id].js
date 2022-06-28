import Layout from '../../components/layout';
import { Box } from '@mui/material';
import {useRouter} from 'next/router';
import MovieCast from '../../components/movieCast';
import MovieResume from '../../components/movieResume';

export default function Movie() {
    const router = useRouter();
    const {id} = router.query;
    
  return (
    <Layout>
        <Box component="div" className="flex flex-col w-4/5 mx-auto p-6 drop-shadow-2xl my-1 rounded" sx={{background:'#303a47'}}>
            <MovieResume />
            <MovieCast movie_id={id}/>
        </Box>
    </Layout>
  );
}
